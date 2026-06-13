import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log("Updating Pulse Energy image in PostgreSQL...");
  await prisma.project.update({
    where: { id: "pulse-video" },
    data: {
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80",
      coverImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1600&q=90"
    }
  });
  console.log("Successfully updated image URL!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
