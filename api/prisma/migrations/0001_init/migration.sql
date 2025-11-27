-- Initial migration for Prisma schema (model User)
-- Run `npx prisma migrate dev --name init` locally to apply

CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Optional index for faster lookups by email
CREATE INDEX IF NOT EXISTS "idx_user_email" ON "User" ("email");
