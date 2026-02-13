// seedData.js
import "dotenv/config";
import { MongoClient } from "mongodb";

const sampleUsers = [
  {
    userId: "u001",
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "student",
    address: { city: "Toronto", country: "Canada" },
    github: "alicecodes",
    skills: ["javascript", "mongodb", "react"],
    stats: { posts: 5, comments: 12 },
    badges: ["early-adopter"],
    createdAt: new Date().toISOString()
  },
  {
    userId: "u002",
    name: "Bob Smith",
    email: "bob@example.com",
    role: "instructor",
    address: { city: "Vancouver", country: "Canada" },
    github: "bobsmith",
    skills: ["python", "mongodb", "docker"],
    stats: { posts: 15, comments: 30 },
    badges: ["expert", "helpful"],
    createdAt: new Date().toISOString()
  },
  {
    userId: "u003",
    name: "Carol White",
    email: "carol@example.com",
    role: "student",
    address: { city: "Toronto", country: "Canada" },
    github: "carolw",
    skills: ["mongodb", "nodejs", "express"],
    stats: { posts: 3, comments: 8 },
    badges: [],
    createdAt: new Date().toISOString()
  }
];

const samplePosts = [
  {
    postId: "p2001",
    authorId: "u001",
    title: "Getting Started with MongoDB",
    content: "MongoDB is a NoSQL database that stores data in flexible, JSON-like documents...",
    tags: ["mongodb", "database", "tutorial"],
    status: "published",
    views: 150,
    createdAt: new Date().toISOString()
  },
  {
    postId: "p2002",
    authorId: "u002",
    title: "Express.js Best Practices",
    content: "Here are some best practices when building APIs with Express.js...",
    tags: ["express", "nodejs", "api"],
    status: "published",
    views: 200,
    createdAt: new Date().toISOString()
  },
  {
    postId: "p2003",
    authorId: "u003",
    title: "Draft: My MongoDB Journey",
    content: "This is a draft post about learning MongoDB...",
    tags: ["mongodb", "learning"],
    status: "draft",
    views: 5,
    createdAt: new Date().toISOString()
  }
];

const sampleComments = [
  {
    commentId: "c001",
    postId: "p2001",
    authorId: "u002",
    text: "Great tutorial! Very helpful for beginners.",
    isFlagged: false,
    likeCount: 5,
    mentions: [],
    createdAt: new Date().toISOString()
  },
  {
    commentId: "c002",
    postId: "p2001",
    authorId: "u003",
    text: "Thanks for sharing this!",
    isFlagged: false,
    likeCount: 2,
    mentions: ["u001"],
    createdAt: new Date().toISOString()
  },
  {
    commentId: "c003",
    postId: "p2001",
    authorId: "u001",
    text: "This is spam content",
    isFlagged: true,
    likeCount: 0,
    mentions: [],
    createdAt: new Date().toISOString()
  },
  {
    commentId: "c004",
    postId: "p2002",
    authorId: "u001",
    text: "I learned a lot from this post!",
    isFlagged: false,
    likeCount: 3,
    mentions: ["u002"],
    createdAt: new Date().toISOString()
  }
];

async function seedDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    
    const db = client.db(process.env.DB_NAME);
    
    // Clear existing data
    await db.collection("users").deleteMany({});
    await db.collection("posts").deleteMany({});
    await db.collection("comments").deleteMany({});
    console.log("Cleared existing data");
    
    // Insert sample data
    await db.collection("users").insertMany(sampleUsers);
    console.log(`Inserted ${sampleUsers.length} users`);
    
    await db.collection("posts").insertMany(samplePosts);
    console.log(`Inserted ${samplePosts.length} posts`);
    
    await db.collection("comments").insertMany(sampleComments);
    console.log(`Inserted ${sampleComments.length} comments`);
    
    console.log("\n✅ Database seeded successfully!");
    
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.close();
  }
}

seedDatabase();