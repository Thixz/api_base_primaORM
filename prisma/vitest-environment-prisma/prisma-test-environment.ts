import "dotenv/config";
import { Environment } from "vitest";
import { randomUUID } from "crypto";
import { execSync } from "child_process";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL not found");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>{
  name: "prisma",

  async setup() {
    // O que vai ser executado antes de cada ARQUIVO teste
    const schema = randomUUID();
    process.env.DATABASE_URL = generateDatabaseURL(schema);

    execSync(`npx prisma migrate deploy`) // Aqui é executado migrate deploy e não migrate dev porque o migrate dev verificar todas migrations antes de cria-las, e aqui no caso queremos simplismente criar as migratios para cada novo schema de database

    return {
      async teardown() {
        // O que vai ser executado depois de cada ARQUIVO de teste
        await prisma.$executeRawUnsafe( `DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
      }, 
    };
  },
};
