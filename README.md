# Fullstack Todo App with Next.js

Building a full-stack todo web with React/Next to practice all I have learnt for June.

## Features

1. Client-side User Authentication with nextAuth.js
2. CRUD operations such as:
    - Create todo
    - Get authenticated user todo
    - Update - starred as important or marked as completed
3. Filter todo list by completed or starred

## Dependencies

- [https://nextjs.org/](Next.js as the React framework)
- [https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations](Next.js server actions and mutations for database manipulations)
- [https://prisma.io/](Prisma as the ORM for migrations and database access)
- [https://vercel.com/storage/postgres](Vercel Postgres as the database)
- [https://next-auth.js.org/](NextAuth.js for authentication)
- [https://www.typescriptlang.org/](TypeScript as the programming language)
- [http://vercel.com/](Vercel for deployment)

view the complete list of front-end dependencies in the corresponding package.json.

## Prerequisites

- Node.js (18.17.0)
- A Vercel Account (to set up a free Postgres database and deploy the app)

## Getting Started

First, run the development server:

```bash
# Install dependencies
npm install
# Start the local server
npm run dev
```

Then, Clone this repo and deploy it to Vercel to create a Vercel project.

Once you have a Vercel project, select the **Storage** tab, then select the **Connect Database** button. Under the **Create New** tab, select **Postgres** and then the **Continue** button.

To create a new database:

- Enter the name of your database example sample_postgres_db, (The name can only contain alphanumeric letters, "_" and "-" and can't exceed 32 characters.)
- Select a region close to you.
- Click **Create**.

After creating a vercel/postgres go to your terminal and run the following commands:

```bash
# Install Vercel CLI. if you haven't already. 
npm i -g vercel@latest

# pull down the latest environment variables to get your local project working.
vercel env pull .env
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Author

- Daniel Enagu - [LinkedIn](https://www.linkedin.com/in/enagudaniel/)
