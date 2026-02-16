require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 8081;
const MONGO_URI = process.env.MONGO_URI;

app.get("/health", (req, res) => res.json({ ok: true }));

app.post("/users", async (req, res) => {
  try {
    const created = await User.create(req.body);
    return res.status(201).json({
      message: "User created",
      data: created,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        message: "Validation failed",
        errors,
      });
    }

    if (err.code === 11000) {
      return res.status(400).json({
        message: "Validation failed",
        errors: ["email must be unique"],
      });
    }

    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      message: "Invalid JSON body",
    });
  }

  return next(err);
});

async function start() {
  if (!MONGO_URI) {
    console.error("Missing MONGO_URI in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
    await User.syncIndexes();
    console.log("Indexes synced");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
}

start();
