import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
    const adminBlogger = await prisma.user.create({
        data: {
            userName: "blogger",
            email: "aCoolEmail@gmail.com",
            password: "aSecretPassword", 
            role: "ADMIN",
        }
    })
    const readerBlogger = await prisma.user.create({
        data: {
            userName: "fantasticReader",
            email: "<EMAIL>",
            password: "<PASSWORD>",
            role: "READER",
        }
    })
    console.log("admin", adminBlogger);
    console.log("reader", readerBlogger);

    process.exit(0);
}

seed()
    .catch(async (err) => {
        console.error(err);
        await prisma.$disconnect();
        process.exit(1);
    });

