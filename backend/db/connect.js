import mongoose from "mongoose";

const connectDB = async (connectionString) => {
  try {
    await mongoose.connect(connectionString)
    console.log("Successfully connected to DB...");
  } catch (err) {
    console.error(err.message);
  }
};

export { connectDB };
