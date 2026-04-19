import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const dept1 = await prisma.department.create({
    data: { name: "Software Engineering" },
  });

  const des1 = await prisma.designation.create({
    data: {
      name: "Intern",
      title: "Intern Developer",
    },
  });

  console.log({ dept1, des1 });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
