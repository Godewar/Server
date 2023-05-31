const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Connected to MongoDB ....✌️ ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB..: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;
