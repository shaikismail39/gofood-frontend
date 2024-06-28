const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://gofood:gofood@cluster0.iiakmk7.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully");

    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodItems = await foodItemsCollection.find({}).toArray();

    const foodCategoryCollection = mongoose.connection.db.collection("food_category");
    const foodCategories = await foodCategoryCollection.find({}).toArray();

    global.food_items = foodItems;
    global.food_category = foodCategories;

    console.log("Data fetched and assigned to global variables");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = mongoDB;
