const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("<h1>Smart Garbage System Backend is Running! 🚀</h1>");
  });

// Routes
app.use("/api/garbage", require("./routes/garbageRoutes"));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
