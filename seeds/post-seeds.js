const { Post } = require("../models");

const postData = [
  {
    title: "Seeding in mySQL",
    post_content:
      "Running the index.js file located wtihin the seeds directory will seed the data stored in the directory",
    user_id: 1,
  },
  {
    title: "What are handlebars?",
    post_content:
      "Handlebars is a templating language that is used to create HTML pages.",
    user_id: 2,
  },
  {
    title: "What are ORMS?",
    post_content:
      "ORMS is a relational database management system that allows you to create, read, update, and delete",
    user_id: 3,
  },
];

const seedPost = () => Post.bulkCreate(postData);

module.exports = seedPost;
