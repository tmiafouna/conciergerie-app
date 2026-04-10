const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected for seeding");

    // Clear existing data
    await User.deleteMany({});

    // Create admin
    const admin = await User.create({
      name: "Admin",
      email: "admin@conciergerie.com",
      password: "admin123",
      role: "admin",
    });
    console.log(`Admin created: ${admin.email} / admin123`);

    // Create test user
    const user = await User.create({
      name: "Client Test",
      email: "client@test.com",
      password: "client123",
      role: "user",
    });
    console.log(`User created: ${user.email} / client123`);

    console.log("\nSeed completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
};

seed();
