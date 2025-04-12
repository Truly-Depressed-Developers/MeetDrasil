import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seed the database with initial data
 */
async function seedData() {
  await seedCompanies();
  await seedDepartaments();
  await seedHobbies();
  await seedEvents();
  await seedUsers();
}

async function seedCompanies() {
  const companies = [
    { name: 'Acme Corp' },
    { name: 'Globex Industries' },
    { name: 'Initech' },
    { name: 'TechNova' },
    { name: 'Stark Industries' },
  ];

  return await prisma.company.createMany({ data: companies });
}

async function seedDepartaments() {
  const departaments = [
    { name: 'Engineering' },
    { name: 'Marketing' },
    { name: 'Sales' },
    { name: 'Human Resources' },
    { name: 'Research & Development' },
    { name: 'Finance' },
  ];

  return await prisma.departament.createMany({ data: departaments });
}

async function seedHobbies() {
  const hobbies = [
    { name: 'Hiking' },
    { name: 'Photography' },
    { name: 'Cooking' },
    { name: 'Gaming' },
    { name: 'Reading' },
    { name: 'Dancing' },
    { name: 'Painting' },
    { name: 'Swimming' },
    { name: 'Cycling' },
    { name: 'Music' },
  ];

  return await prisma.hobby.createMany({ data: hobbies });
}

async function seedEvents() {
  // Fetch hobby IDs to use in events
  const hobbies = await prisma.hobby.findMany();

  const events = [
    {
      name: 'Tech Conference 2025',
      description: 'Annual technology conference with workshops and networking',
      city: 'Kraków',
      latitude: 50.0647,
      longitude: 19.945,
      startDate: new Date('2025-05-15T09:00:00Z'),
      endDate: new Date('2025-05-17T18:00:00Z'),
      minCapacity: 50,
      maxCapacity: 500,
      price: 199.99,
      ownerId: 'owner1',
      images: ['tech-conf-1.jpg', 'tech-conf-2.jpg'],
    },
    {
      name: 'Outdoor Adventure Day',
      description: 'Explore nature with like-minded outdoor enthusiasts',
      city: 'Zakopane',
      latitude: 49.2992,
      longitude: 19.9496,
      startDate: new Date('2025-06-20T08:00:00Z'),
      endDate: new Date('2025-06-20T20:00:00Z'),
      minCapacity: 10,
      maxCapacity: 50,
      price: 49.99,
      ownerId: 'owner2',
      images: ['outdoor-1.jpg', 'outdoor-2.jpg'],
    },
    {
      name: 'Art & Culture Festival',
      description: 'Celebrating local artists and cultural heritage',
      city: 'Warszawa',
      latitude: 52.2297,
      longitude: 21.0122,
      startDate: new Date('2025-07-10T10:00:00Z'),
      endDate: new Date('2025-07-12T22:00:00Z'),
      minCapacity: 100,
      maxCapacity: 1000,
      price: 79.99,
      ownerId: 'owner3',
      images: ['art-fest-1.jpg', 'art-fest-2.jpg', 'art-fest-3.jpg'],
    },
    {
      name: 'Board Game Night',
      description: 'Social evening with various board games',
      city: 'Wrocław',
      latitude: 51.1079,
      longitude: 17.0385,
      startDate: new Date('2025-05-25T18:00:00Z'),
      endDate: new Date('2025-05-25T23:00:00Z'),
      minCapacity: 8,
      maxCapacity: 30,
      price: 15.0,
      ownerId: 'owner4',
      images: ['boardgame-1.jpg'],
    },
  ];

  // Create events one by one to connect with hobbies
  for (const eventData of events) {
    // Select 2-3 random hobbies for each event
    const randomHobbies = hobbies
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 2) + 2);

    await prisma.event.create({
      data: {
        ...eventData,
        tags: {
          connect: randomHobbies.map((hobby) => ({ id: hobby.id })),
        },
      },
    });
  }
}

async function seedUsers() {
  // Get IDs to use for relations
  const companies = await prisma.company.findMany();
  const departaments = await prisma.departament.findMany();
  const hobbies = await prisma.hobby.findMany();
  const events = await prisma.event.findMany();

  const users = [
    {
      fullname: 'John Doe',
      company: { connect: { id: companies[0].id } },
      departament: { connect: { id: departaments[0].id } },
    },
    {
      fullname: 'Jane Smith',
      company: { connect: { id: companies[1].id } },
      departament: { connect: { id: departaments[1].id } },
    },
    {
      fullname: 'Alex Wilson',
      company: { connect: { id: companies[2].id } },
      departament: { connect: { id: departaments[2].id } },
    },
    {
      fullname: 'Maria Garcia',
      company: { connect: { id: companies[0].id } },
      departament: { connect: { id: departaments[3].id } },
    },
    {
      fullname: 'David Brown',
      company: { connect: { id: companies[3].id } },
      departament: { connect: { id: departaments[4].id } },
    },
  ];

  // Create users one by one to connect with hobbies and events
  for (let i = 0; i < users.length; i++) {
    // Select 1-3 random hobbies for each user
    const randomHobbies = hobbies
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);

    // Select a random event for some users
    const randomEvent = i < 3 ? events[i] : null;

    await prisma.user.create({
      data: {
        ...users[i],
        hobbies: {
          connect: randomHobbies.map((hobby) => ({ id: hobby.id })),
        },
        ...(randomEvent ? { Event: { connect: { id: randomEvent.id } } } : {}),
      },
    });
  }
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
