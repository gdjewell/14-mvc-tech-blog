const { User } = require("../models");

const userData = [
  {
    email: "ron@gmail.com",
    username: "Ronny",
    password: "SunnyRon1",
  },
  {
    email: "Dave@aol.com",
    username: "chancedavey",
    password: "whyIsthishere1?",
  },
  {
    email: "chosenone@google.com",
    username: "theone",
    password: "cB593a-adfka;39",
  },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;
