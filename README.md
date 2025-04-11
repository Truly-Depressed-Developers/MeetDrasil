## Development

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