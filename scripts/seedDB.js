const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/reactHouse"
);

const houseSeed = [
  {
    address: "19 Chestnut St,Edison,NJ 08817",
    county: "Middlesex",
    building_type: "Single Family House",
    finished_size: "1836",
    year_built: "1951"
  },
  {
    Address:"2 CHESTNUT ST, EDISON, NJ 08817",
    County:"Middlesex County",
    building_type:"Single Family Residence / Townhouse",
    finished_size:"2034",
    year_built:"1992"
  }
];

db.House
  .remove({})
  .then(() => db.House.collection.insertMany(houseSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
