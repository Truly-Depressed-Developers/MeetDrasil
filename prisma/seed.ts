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
      name: 'Spacer integracyjny po Starym Mieście',
      description:
        'Odkryjcie razem uroki Krakowa podczas spaceru z przewodnikiem. Idealne na poznanie historii i integrację w nieformalnej atmosferze.',
      city: 'Kraków',
      latitude: 50.0614,
      longitude: 19.9366,
      startDate: '2025-05-15T16:00:00.000Z',
      endDate: '2025-05-15T18:00:00.000Z',
      minCapacity: 5,
      maxCapacity: 20,
      price: 25.0,
      ownerId: users[0].id,
      images: ['https://fzpsqhdkdy.ufs.sh/f/y6uhPjTjpTOZD7Tm80EXz5lMLfhdB691An2rYxpGHiqXVWEc'],
    },
    {
      name: 'Warsztaty kulinarne: Smaki Krakowa',
      description:
        'Wspólne gotowanie tradycyjnych krakowskich potraw to świetny sposób na integrację i naukę nowych umiejętności kulinarnych.',
      city: 'Kraków',
      latitude: 50.0571,
      longitude: 19.9444,
      startDate: '2025-05-22T17:00:00.000Z',
      endDate: '2025-05-22T20:00:00.000Z',
      minCapacity: 6,
      maxCapacity: 12,
      price: 75.0,
      ownerId: users[1].id,
      images: ['https://fzpsqhdkdy.ufs.sh/f/y6uhPjTjpTOZPwGpRyIHO5c4yK7STp2YgslMUQC9DhvjtEwW'],
    },
    {
      name: 'Escape Room: Tajemnice Krakowa',
      description:
        'Rozwiązywanie zagadek w tematycznym escape roomie to doskonała okazja do współpracy i logicznego myślenia.',
      city: 'Kraków',
      latitude: 50.06,
      longitude: 19.9383,
      startDate: '2025-05-29T19:00:00.000Z',
      endDate: '2025-05-29T20:30:00.000Z',
      minCapacity: 2,
      maxCapacity: 5,
      price: 60.0,
      ownerId: users[2].id,
      images: ['https://fzpsqhdkdy.ufs.sh/f/y6uhPjTjpTOZGOp4bayqxJdIMvzQLrA1y5ow3pskDO62Gumi'],
    },
    {
      name: 'Wieczór planszówek w klimatycznej kawiarni',
      description:
        'Spędźcie wieczór grając w planszówki, poznając się lepiej i rywalizując w przyjaznej atmosferze.',
      city: 'Kraków',
      latitude: 50.0592,
      longitude: 19.9375,
      startDate: '2025-06-05T20:00:00.000Z',
      endDate: '2025-06-05T23:00:00.000Z',
      minCapacity: 4,
      maxCapacity: 10,
      price: 20.0,
      ownerId: users[3].id,
      images: ['https://fzpsqhdkdy.ufs.sh/f/y6uhPjTjpTOZb00mUMC4nK60XvUgAoxTLrw25ltWGqfPkMBp'],
    },
    {
      name: 'Karaoke Night: Wspólne śpiewanie',
      description:
        'Oderwijcie się od codzienności i pokażcie swoje talenty wokalne podczas wieczoru karaoke.',
      city: 'Kraków',
      latitude: 50.0583,
      longitude: 19.9408,
      startDate: '2025-06-12T21:00:00.000Z',
      endDate: '2025-06-13T01:00:00.000Z',
      minCapacity: 5,
      maxCapacity: 15,
      price: 30.0,
      ownerId: users[4].id,
      images: ['https://fzpsqhdkdy.ufs.sh/f/y6uhPjTjpTOZF5i2trL5DcMHxdXIFJAGroPsQbmkujyVLB2q'],
    },
    {
      name: 'Salsa dla początkujących',
      description:
        'Naucz się podstawowych kroków salsy i baw się dobrze podczas energicznych zajęć tanecznych.',
      city: 'Kraków',
      latitude: 50.0625,
      longitude: 19.935,
      startDate: '2025-06-19T18:30:00.000Z',
      endDate: '2025-06-19T20:00:00.000Z',
      minCapacity: 8,
      maxCapacity: 16,
      price: 45.0,
      ownerId: users[0].id,
      images: ['https://fzpsqhdkdy.ufs.sh/f/y6uhPjTjpTOZVzHO8xGiUyjc3G0kflunBKh7PHMFD4egICxm'],
    },
    {
      name: 'Gra miejska: Śladami legend Krakowa',
      description:
        'Odkryjcie tajemnice Krakowa, rozwiązując zagadki i wykonując zadania w terenie.',
      city: 'Kraków',
      latitude: 50.0567,
      longitude: 19.9458,
      startDate: '2025-06-26T15:00:00.000Z',
      endDate: '2025-06-26T18:00:00.000Z',
      minCapacity: 4,
      maxCapacity: 12,
      price: 50.0,
      ownerId: users[1].id,
      images: ['https://fzpsqhdkdy.ufs.sh/f/y6uhPjTjpTOZZ0zR7XvnrwmGCE0hPWeadjXHD89bOS67NtTu'],
    },
    {
      name: 'Warsztaty artystyczne: Malowanie na płótnie',
      description:
        'Wyraźcie swoją kreatywność podczas warsztatów malarskich, gdzie stworzycie własne dzieła sztuki.',
      city: 'Kraków',
      latitude: 50.0633,
      longitude: 19.9392,
      startDate: '2025-07-03T17:30:00.000Z',
      endDate: '2025-07-03T20:30:00.000Z',
      minCapacity: 6,
      maxCapacity: 10,
      price: 65.0,
      ownerId: users[2].id,
      images: ['https://fzpsqhdkdy.ufs.sh/f/y6uhPjTjpTOZvtfRjeFmk9Sre3zty8ADjbadMnVPFgLW7YQX'],
    },
    {
      name: 'Piknik integracyjny w Parku Jordana',
      description:
        'Spędźcie czas na świeżym powietrzu, grając w gry i integrując się podczas pikniku w Parku Jordana.',
      city: 'Kraków',
      latitude: 50.0533,
      longitude: 19.9283,
      startDate: '2025-07-10T14:00:00.000Z',
      endDate: '2025-07-10T17:00:00.000Z',
      minCapacity: 10,
      maxCapacity: 25,
      price: 15.0,
      ownerId: users[3].id,
      images: ['https://fzpsqhdkdy.ufs.sh/f/y6uhPjTjpTOZQXlYAHt0dzXsNVg1xKpbGr3kqyWTPEMYUZm7'],
    },
    {
      name: 'Wizyta w Muzeum Figur Woskowych',
      description:
        'Wizyta w Muzeum Figur Woskowych z wyjątkowo złą sławą, idealne miejsce, żeby się tam wybrać dla beki.',
      city: 'Kraków',
      latitude: 50.0619,
      longitude: 19.9371,
      startDate: '2025-07-17T15:00:00.000Z',
      endDate: '2025-07-17T18:00:00.000Z',
      minCapacity: 4,
      maxCapacity: 12,
      price: 50.0,
      ownerId: users[4].id,
      images: ['https://fzpsqhdkdy.ufs.sh/f/y6uhPjTjpTOZy21p4HTjpTOZ3AnK48MCBQRHWqJsN7hrUoGE'],
    },
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
      images: ['https://fzpsqhdkdy.ufs.sh/f/y6uhPjTjpTOZQXlYAHt0dzXsNVg1xKpbGr3kqyWTPEMYUZm7'],
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
      images: ['https://fzpsqhdkdy.ufs.sh/f/y6uhPjTjpTOZL0DJkamLuGQrkpWg2lYdzyHDhwc394OXIBPV'],
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
      images: ['https://fzpsqhdkdy.ufs.sh/f/y6uhPjTjpTOZ80kWxoJfG2Eh4ctgYJaWxQqBb7nzPMsor0kS'],
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
      images: ['https://fzpsqhdkdy.ufs.sh/f/y6uhPjTjpTOZoxvVz21mEhVr4b2WgYnDvCzFBe1NkOU0dxJj'],
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
