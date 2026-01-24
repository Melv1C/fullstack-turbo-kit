import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

type PrismaDelegate = {
  findFirst(args: { where: Record<string, unknown> }): Promise<unknown>;
  update(args: { where: Record<string, unknown>; data: Record<string, unknown> }): Promise<unknown>;
  create(args: { data: Record<string, unknown> }): Promise<unknown>;
};

export async function syncJsonData(
  filename: string,
  prismaInstance: PrismaDelegate,
  uniqueFields: string[],
): Promise<void> {
  const dataPath = join(__dirname, `../data/${filename}.json`);
  const fileContent = readFileSync(dataPath, 'utf-8');
  const data = JSON.parse(fileContent) as unknown[];

  if (!Array.isArray(data)) {
    throw new Error(
      `Invalid data format in ${filename}.json: expected array but got ${typeof data}`,
    );
  }

  const uniqueFieldsStr = uniqueFields.join(', ');

  let successCount = 0;
  let failureCount = 0;

  console.log(`  Syncing ${filename}...`);

  for (const line of data) {
    try {
      if (typeof line !== 'object' || line === null) {
        throw new Error(`Invalid record format: expected object but got ${typeof line}`);
      }

      const record = line as Record<string, unknown>;

      // Validate all unique fields exist
      for (const field of uniqueFields) {
        if (!(field in record)) {
          throw new Error(`Missing unique field "${field}" in record: ${JSON.stringify(record)}`);
        }
      }

      // Build where clause with all unique fields
      const where = uniqueFields.reduce(
        (acc, field) => {
          acc[field] = record[field];
          return acc;
        },
        {} as Record<string, unknown>,
      );

      // Try to find existing record
      const existing = await prismaInstance.findFirst({ where });

      if (existing) {
        // Update if found
        await prismaInstance.update({
          where: { id: (existing as Record<string, unknown>).id },
          data: record,
        });
      } else {
        // Create if not found
        await prismaInstance.create({ data: record });
      }
      successCount++;
    } catch (error) {
      failureCount++;
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`    ✗ Failed to sync record: ${errorMessage}`);
    }
  }

  console.log(
    `    ✓ Synced ${filename}: ${successCount} success, ${failureCount} failed (unique: ${uniqueFieldsStr})`,
  );

  if (failureCount > 0) {
    throw new Error(`Failed to sync all records in ${filename}: ${failureCount} record(s) failed`);
  }
}
