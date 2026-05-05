const mongoose = require("mongoose");

let isConnected = false;

async function connectDatabase() {
  if (isConnected) {
    return;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  await mongoose.connect(uri);
  isConnected = true;
}

module.exports = connectDatabase;
