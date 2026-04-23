const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)="?(.*?)"?$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2];
    }
  }
}

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const migrationsDir = path.join(__dirname, "..", "prisma", "migrations");

async function ensureMigrationTable() {
  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
      "id" VARCHAR(36) PRIMARY KEY NOT NULL,
      "checksum" VARCHAR(64) NOT NULL,
      "finished_at" TIMESTAMPTZ,
      "migration_name" VARCHAR(255) NOT NULL,
      "logs" TEXT,
      "rolled_back_at" TIMESTAMPTZ,
      "started_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
      "applied_steps_count" INTEGER NOT NULL DEFAULT 0
    )
  `);
}

async function hasMigration(name) {
  const rows = await prisma.$queryRawUnsafe(
    'SELECT 1 FROM "_prisma_migrations" WHERE "migration_name" = $1 LIMIT 1',
    name
  );

  return rows.length > 0;
}

async function recordMigration(name, checksum) {
  await prisma.$executeRawUnsafe(
    `INSERT INTO "_prisma_migrations"
      ("id", "checksum", "finished_at", "migration_name", "started_at", "applied_steps_count")
     VALUES ($1, $2, now(), $3, now(), 1)`,
    crypto.randomUUID(),
    checksum,
    name
  );
}

async function main() {
  await ensureMigrationTable();

  const migrations = fs
    .readdirSync(migrationsDir)
    .filter((entry) => fs.existsSync(path.join(migrationsDir, entry, "migration.sql")))
    .sort();

  for (const migrationName of migrations) {
    if (await hasMigration(migrationName)) {
      console.log(`Already applied: ${migrationName}`);
      continue;
    }

    const sqlPath = path.join(migrationsDir, migrationName, "migration.sql");
    const sql = fs.readFileSync(sqlPath, "utf8");
    const checksum = crypto.createHash("sha256").update(sql).digest("hex");

    await prisma.$executeRawUnsafe(sql);
    await recordMigration(migrationName, checksum);
    console.log(`Applied: ${migrationName}`);
  }
}

main()
  .catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
