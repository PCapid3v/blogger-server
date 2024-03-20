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

   const randomBlogs = await prisma.post.createMany({
     data: [
       {
         id: 1,
         title: "Exploring the Wonders of Nature",
         content:
           "Nature has so much to offer, from breathtaking landscapes to fascinating wildlife. In this post, we'll embark on a journey to discover the incredible beauty and diversity of the natural world around us.",
         published: true,
         category: "Travel",
         cover:
           "https://plus.unsplash.com/premium_photo-1673002094173-b16f2b946780?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         subCategory: "Outdoor Adventures",
         authorName: "John Doe",
         authorId: 1,
         authorAvatar:
           "https://images.unsplash.com/photo-1503235930437-8c6293ba41f5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         createdAt: "2023-06-01T08:00:00.000Z",
         updatedAt: "2023-06-01T08:00:00.000Z",
       },
       {
         id: 2,
         title: "Mastering the Art of Baking",
         content:
           "Baking is not only a delicious hobby but also a wonderful way to express your creativity. In this post, we'll share tips, techniques, and recipes to help you elevate your baking skills to the next level.",
         published: true,
         category: "Food",
         cover :"https://images.unsplash.com/photo-1588467850695-a898367ce465?q=80&w=2535&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         subCategory: "Baking",
         authorName: "John Doe",
         authorId: 1,
         authorAvatar:
           "https://images.unsplash.com/photo-1503235930437-8c6293ba41f5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         createdAt: "2023-06-02T10:30:00.000Z",
         updatedAt: "2023-06-02T10:30:00.000Z",
       },
       {
         id: 3,
         title: "The Power of Positive Thinking",
         content:
           "Positive thinking has the ability to transform your life. In this post, we'll explore the benefits of maintaining a positive mindset and provide practical strategies to cultivate positivity in your daily life.",
         published: true,
         category: "Self-Improvement",
         cover : "https://images.unsplash.com/photo-1617251137884-f135eccf6942?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         subCategory: "Mindset",
         authorName: "John Doe",
         authorId: 1,
         authorAvatar:
           "https://images.unsplash.com/photo-1503235930437-8c6293ba41f5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         createdAt: "2023-06-03T14:45:00.000Z",
         updatedAt: "2023-06-03T14:45:00.000Z",
       },
       {
         id: 4,
         title: "The Future of Remote Work",
         content:
           "Remote work has become increasingly popular in recent years. In this post, we'll discuss the advantages and challenges of remote work and explore how it is shaping the future of the modern workplace.",
         published: false,
         category: "Business",
         subCategory: "Remote Work",
         authorName: "John Doe",
         authorId: 1,
         authorAvatar:
           "https://images.unsplash.com/photo-1503235930437-8c6293ba41f5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         createdAt: "2023-06-04T09:15:00.000Z",
         updatedAt: "2023-06-04T09:15:00.000Z",
       },
       {
         id: 5,
         title: "The Benefits of Yoga for Mind and Body",
         content:
           "Yoga is more than just a physical practice; it is a holistic approach to well-being. In this post, we'll explore the numerous benefits of yoga for both mental and physical health and provide beginner-friendly poses to get started.",
         published: true,
         category: "Health",
         subCategory: "Yoga",
         cover : "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2202&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         authorName: "John Doe",
         authorId: 1,
         authorAvatar:
           "https://images.unsplash.com/photo-1503235930437-8c6293ba41f5?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
         createdAt: "2023-06-05T11:00:00.000Z",
         updatedAt: "2023-06-05T11:00:00.000Z",
       },
     ],
   });
        
    console.log("admin", adminBlogger);
    console.log("reader", readerBlogger);
    console.log("randomBlogs count", randomBlogs);

    process.exit(0);
}

seed()
    .catch(async (err) => {
        console.error(err);
        await prisma.$disconnect();
        process.exit(1);
    });

