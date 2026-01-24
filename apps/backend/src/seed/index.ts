import { env } from '@/lib/env';
import { prisma } from '@/lib/prisma';
import { seedAdmin } from './seeders/admin';
import { syncJsonData } from './seeders/json-sync';

export async function seed(): Promise<void> {
  console.log('🌱 Starting database seed...');
  console.log(`   Environment: ${env.NODE_ENV}`);
  console.log('');

  const seedResults = {
    succeeded: [] as string[],
    failed: [] as Array<{ step: string; error: string }>,
  };

  try {
    // 1. Seed admin user
    try {
      await seedAdmin();
      seedResults.succeeded.push('admin');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      seedResults.failed.push({ step: 'admin', error: errorMessage });
      throw error; // Re-throw to stop seeding on critical failure
    }
    console.log('');

    // 2. Sync JSON data
    try {
      await syncJsonData('logs', prisma.log, ['message']);
      seedResults.succeeded.push('logs');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      seedResults.failed.push({ step: 'logs', error: errorMessage });
      throw error; // Re-throw to stop seeding on critical failure
    }
    console.log('');

    console.log('✅ Database seeding complete!');
    console.log(`   Completed: ${seedResults.succeeded.join(', ')}`);
  } catch (error) {
    console.error('❌ Seeding failed!');
    if (seedResults.failed.length > 0) {
      console.error('   Failed steps:');
      for (const failure of seedResults.failed) {
        console.error(`     - ${failure.step}: ${failure.error}`);
      }
    }
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run directly if called as a script
const isMainModule = import.meta.url === `file://${process.argv[1]}`;
if (isMainModule) {
  seed()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
