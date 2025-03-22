const mongoose = require("mongoose");
const fs = require("fs");

// 🧠 Your Atlas URI:
const MONGO_URI = process.env.MONGO_URI;

// 🔁 Replace with your actual schema path
const GarbageBin = require("./src/models/GarbageBin");

const data = JSON.parse(fs.readFileSync("bins.json", "utf-8"));

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("✅ Connected to MongoDB Atlas");

    // Optional: Clear old data
    await GarbageBin.deleteMany();
    await GarbageBin.insertMany(data);
    console.log("✅ Bins imported successfully");

    process.exit();
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });
