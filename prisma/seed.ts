import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seed the database with initial data
 */
async function seedData() {
  await seedExamples();
}

async function seedExamples() {
  const examples = [{ name: 'example1' }, { name: 'example2' }, { name: 'example3' }];

  return await prisma.example.createMany({ data: examples });
}

/**
 * Main seed function to populate the database
 */
async function main(): Promise<void> {
  try {
    await clearDatabase();
    await seedData();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

/**
 * Clear all data from the database
 */
async function clearDatabase(): Promise<void> {
  const tableNames = await prisma.$queryRaw<
    { tablename: string }[]
  >`SELECT tablename FROM pg_tables WHERE schemaname='public' and tablename NOT LIKE '_prisma_migrations'`;

  for (const { tablename } of tableNames) {
    try {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${tablename}" RESTART IDENTITY CASCADE;`);
    } catch (error) {
      console.error(`Error truncating table ${tablename}:`, error);
    }
  }
}

// Run the seed function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Close Prisma Client at the end
    await prisma.$disconnect();
  });
