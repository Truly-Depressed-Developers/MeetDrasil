import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Seed the database with initial data
 */
async function seedData() {
  await seedPlans();
  await seedCompanies();
  await seedDepartments();
  await seedHobbies();
  await seedUsers();
  await seedEvents();
}

async function seedPlans() {
  const plans = [{ name: 'Basic' }, { name: 'Premium' }];

  return await prisma.plan.createMany({ data: plans });
}

async function seedCompanies() {
  const plans = await prisma.plan.findMany();

  const companies = [
    { name: 'Acme Corp', planId: plans[0].id },
    { name: 'Globex Industries', planId: plans[1].id },
    { name: 'Initech', planId: plans[0].id },
    { name: 'TechNova', planId: plans[1].id },
    { name: 'Stark Industries', planId: plans[1].id },
  ];

  return await prisma.company.createMany({ data: companies });
}

async function seedDepartments() {
  const departments = [
    { name: 'Engineering' },
    { name: 'Marketing' },
    { name: 'Sales' },
    { name: 'Human Resources' },
    { name: 'Research & Development' },
    { name: 'Finance' },
  ];

  return await prisma.department.createMany({ data: departments });
}

async function seedHobbies() {
  const hobbies = [
    { name: 'Motorization', image: '/icons/car.png' },
    { name: 'Cinema', image: '/icons/cinema.png' },
    { name: 'Traveling', image: '/icons/travel.png' },
    { name: 'Music', image: '/icons/music.png' },
    { name: 'Gaming', image: '/icons/games.png' },
    { name: 'Food', image: '/icons/food.png' },
    { name: 'Sport', image: '/icons/football.png' },
    { name: 'Technology', image: '/icons/technology.png' },
  ];

  return await prisma.hobby.createMany({ data: hobbies });
}

async function seedUsers() {
  const companies = await prisma.company.findMany();
  const departments = await prisma.department.findMany();
  const hobbies = await prisma.hobby.findMany();

  const users = [
    {
      id: 'bebc4590-3d03-4c64-b5d0-920d3569be76',
      fullname: 'John Doe',
      company: { connect: { id: companies[0].id } },
      department: { connect: { id: departments[0].id } },
    },
    {
      id: '2dd352cd-9149-48b0-b5aa-39a7c9715f72',
      fullname: 'Jane Smith',
      company: { connect: { id: companies[1].id } },
      department: { connect: { id: departments[1].id } },
    },
    {
      id: 'e7db75de-a338-41a4-8a05-2cdfec052930',
      fullname: 'Alex Wilson',
      company: { connect: { id: companies[2].id } },
      department: { connect: { id: departments[2].id } },
    },
    {
      id: 'a105a695-40cc-4e0d-ba4b-a190c3079038',
      fullname: 'Maria Garcia',
      company: { connect: { id: companies[0].id } },
      department: { connect: { id: departments[3].id } },
    },
    {
      id: '3bcfea38-f18b-48fc-b738-3902d220dcfc',
      fullname: 'David Brown',
      company: { connect: { id: companies[3].id } },
      department: { connect: { id: departments[4].id } },
    },
  ];

  for (const user of users) {
    const randomHobbies = hobbies
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);

    await prisma.user.create({
      data: {
        ...user,
        hobbies: {
          connect: randomHobbies.map((hobby) => ({ id: hobby.id })),
        },
      },
    });
  }
}

async function seedEvents() {
  const hobbies = await prisma.hobby.findMany();
  const users = await prisma.user.findMany();

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
      ownerId: users[0].id,
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
      ownerId: users[1].id,
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
      ownerId: users[2].id,
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
      ownerId: users[3].id,
      images: ['boardgame-1.jpg'],
    },
  ];

  for (const eventData of events) {
    const randomHobbies = hobbies
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 2) + 2);

    const event = await prisma.event.create({
      data: {
        ...eventData,
        tags: {
          connect: randomHobbies.map((hobby) => ({ id: hobby.id })),
        },
      },
    });

    // Assign random participants to the event
    const randomParticipants = users
      .filter((user) => user.id !== eventData.ownerId)
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 5) + 1);

    await prisma.event.update({
      where: { id: event.id },
      data: {
        participants: {
          connect: randomParticipants.map((user) => ({ id: user.id })),
        },
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
    await prisma.$disconnect();
  });
