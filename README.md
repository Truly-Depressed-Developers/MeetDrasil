# MeetDrasil

## 💼 What is MeetDrasil?
MeetDrasil is an app designed to help employees in large companies navigate corporate life—not through another productivity tool, but by fostering real human connections.

## 🧩 Connecting through passions, not job titles
In multi-floor offices with complex structures and countless departments, it’s hard to naturally meet colleagues. MeetDrasil builds bridges between teams and departments by connecting people through shared interests and passions—the ones that exist outside of spreadsheets and video calls.

## 🎉 From events to shared hobbies
The app allows employees to create and join interest-based events, hobby groups, and active communities. Whether it’s running clubs, board games, or cooking workshops—everyone can find their place.

## 🌱 A new approach to integration and onboarding
MeetDrasil offers a modern way to foster employee integration, especially in hybrid and distributed work environments. We support onboarding, strengthen bonds, and help build a vibrant company culture that lives beyond Slack.

# Motivation

**MeetDrasil** was created at <a href="https://hacknarok.pl/" target="_blank">Hacknarök</a> 2025 Hackathon.

- Topic: Połącz dziewięć światów jednym kodem
- Timeframe: 12-13.04.2025, 24 hours

# Media

- [DevPost submission](https://devpost.com/software/ogolna-seriously-depressed-developers-meetdrasil)
- [Slides](https://www.figma.com/deck/TS95FsY8yycukm61SMMcT6/MeetDrasil?node-id=3-44&t=AQ0jsTJidyAE03a0-1)
- [Video demo](https://www.youtube.com/watch?v=dEG640-dkdY)

# Tech Stack

<img alt="NEXT.JS" src="https://img.shields.io/badge/Next.js-000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
<img alt="REACTJS" src="https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black"/>
<img alt="TYPESCRIPT" src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white"/>
<img alt="TAILWIND" src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4.svg?style=for-the-badge&logo=Tailwind-CSS&logoColor=white"/>
<img alt="SHADCN" src="https://img.shields.io/badge/shadcn/ui-000000.svg?style=for-the-badge&logo=shadcn/ui&logoColor=white"/>
<img alt="POSTGRESQL" src="https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white"/>
<img alt="PRISMA" src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"/>
<img alt="SUPABASE" src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white"/>
<img alt="TRPC" src="https://img.shields.io/badge/tRPC-2596BE?style=for-the-badge&logo=trpc&logoColor=white"/>

# Authors

- [@Sosek1](https://github.com/Sosek1)
- [@MSiorr](https://github.com/MSiorr)
- [@CALLmeDOMIN](https://github.com/CALLmeDOMIN)
- [@rubikon02](https://github.com/rubikon02)

# License

This project is licensed under [MIT](./LICENSE) license.

# Development

### Prerequisites
1. Node JS 20, version 20.9.0 or later
2. pnpm package manager ([installation guide](https://pnpm.io/installation))
   1. For people of restiance `npm install -g pnpm@latest-10`

### Installing the dependencies
Run `pnpm install` to install all the necessary dependencies for the project

### Setting up env vars
Create a new file that is not tracked by git, `.env` in the root of the project. Make sure to populate it will all the required environmental variables (example of those with corresponding values can be seen in [`.env.example`](./.env.example)). (yes, you can just copy it)

If you add a new env var to the application, please describe it in [`.env.example`](./.env.example) file as well

### Starting the development server
Run `pnpm run dev` to start a developer server at http://localhost:3000

## Working with Database

Project is using a PostgreSQL database. [`./.docker/postgresql.yaml`](./.docker/postgresql.yaml) contains an example docker-compose file for running the database locally. If you are using VSCode you can also launch a task called `Next.JS: Dev`, which sets up the database and launches the app in development mode.

### Modifying the schema

[`schema.prisma`](./prisma/schema.prisma) contains the schema of the database, as well as information about the providers, adapters and generators. You are free to modify the schema to suit you needs.

When you want to test if the schema you created works as expected, you can use `pnpm run push` to update your database schema and generate prisma client, without create a new migration. Use it for prototyping until you are sure that your changes work flawlessly.

When finished, you need to make your schema changes persistant by running `pnpm run migrate:new <name_of_the_migration>` to create a new migration. Treat migrations as commits in Git - each migration should represent an unit of work.

> [!WARNING]
> Migration files should not be edited manually. Content of `prisma/migrations` is auto-generated and any changes to it might be overwritten.

### Seeding the Database

By default, local database is created empty. To reduce the amount of time spent on putting useful data into it there exists [`seed.ts`](./prisma/seed.ts) file. The sole purpose of this file is to provide an easy way for dummy data to be inserted into the database. To seed the database using this file, run `pnpm run seed`.

When modifying the schema (by adding new fileds, tables, relations) it is advised to also modify the `seed.ts` file so that the person who works with the new schema will be able to easily integrate those changes into their database.

## Commiting your changes

Project uses ESLint and Prettier to enforce consistent code style. Before pushing your code to the remote repository, it is advised to fix all the errors and warnings reported by ESLint. Running `pnpm run lint:fix` will fix simple errors, while `pnpm run lint` will pinpoint all remaining issues. You cannot push your changes if ESLint reports any error.