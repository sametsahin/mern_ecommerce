import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo db connected ${db.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnect;
