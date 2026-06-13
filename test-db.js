import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log("Checking database connection and schema contents...\n");
  
  const projectCount = await prisma.project.count();
  const userCount = await prisma.user.count();
  const eventCount = await prisma.event.count();
  const contentCount = await prisma.dynamicContent.count();

  console.log("--- Neon PostgreSQL Database Verification Report ---");
  console.log(`- Connection Status: SUCCESS`);
  console.log(`- Projects table count: ${projectCount} rows`);
  console.log(`- Users table count: ${userCount} rows`);
  console.log(`- Events table count: ${eventCount} rows`);
  console.log(`- DynamicContent table count: ${contentCount} rows`);
  
  if (projectCount > 0) {
    console.log("\nProject Titles in Database:");
    const projects = await prisma.project.findMany({ select: { title: true } });
    projects.forEach(p => console.log(`  * ${p.title}`));
  }
}

main()
  .catch(err => {
    console.error("Database connection failed:", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
