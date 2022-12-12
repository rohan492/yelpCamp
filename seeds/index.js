const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //YOUR USER ID
      author: "6375dc5780cdc08aa771afc9",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum aliquam sunt architecto deleniti eveniet nam cum officia fugit excepturi, laudantium nobis molestiae. Fugit porro beatae veritatis! Corporis eaque provident sed.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/djkrqjcf6/image/upload/v1670844744/YelpCamp/ejwru7qlbjyamee5leqa.jpg",
          filename: "YelpCamp/h8qakkgdkl7sdmyqwgy5",
        },
        {
          url: "https://res.cloudinary.com/djkrqjcf6/image/upload/v1670844741/YelpCamp/v6q1whld6akqpfxj0vp0.jpg",
          filename: "YelpCamp/pneuibln7wx04zzdz3rl",
        },
      ],
    });
    await camp.save();
  }
};

seedDb().then(() => {
  mongoose.connection.close();
});
