const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://abhisheksharma32344:mCsazyHBH9I82qPH@cluster0.xdlyz3h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

    console.log(`This is connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in connecting with MongoDB ${error}`);
  }
};
// mCsazyHBH9I82qPH

module.exports = connectDb;
