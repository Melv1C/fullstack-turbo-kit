import { auth } from '@/lib/auth';
import { env } from '@/lib/env';
import { prisma } from '@/lib/prisma';
import { UserRole$ } from '@repo/utils';

export async function seedAdmin(): Promise<void> {
  if (!env.SEED_ADMIN_EMAIL || !env.SEED_ADMIN_PASS) {
    console.log('  Skipping admin seeding (env variables not set)');
    return;
  }

  console.log('Seeding admin...');

  const existingAdmin = await prisma.user.findUnique({
    where: { email: env.SEED_ADMIN_EMAIL },
  });

  if (existingAdmin) {
    console.log(`  ✓ Admin already exists: ${existingAdmin.email}`);
    return;
  }

  try {
    const result = await auth.api.signUpEmail({
      body: {
        name: 'Admin',
        email: env.SEED_ADMIN_EMAIL,
        password: env.SEED_ADMIN_PASS,
      },
    });

    if (!result.user) {
      throw new Error('Sign up succeeded but user object was not returned');
    }

    await prisma.user.update({
      where: { id: result.user.id },
      data: {
        role: UserRole$.enum.admin,
        emailVerified: true,
      },
    });

    console.log(`  ✓ Created admin: ${env.SEED_ADMIN_EMAIL}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to create admin user ${env.SEED_ADMIN_EMAIL}: ${errorMessage}`);
  }
}
