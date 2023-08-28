const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Mongoose connected to MONGODB Atlas');
    
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = connectDb;