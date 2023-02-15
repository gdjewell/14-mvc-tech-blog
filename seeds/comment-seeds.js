const { Comment } = require("../models");

const commentData = [
  {
    post_id: 2,
    user_id: 1,
    comment_content: "This is the first comment!",
  },
  {
    post_id: 3,
    user_id: 2,
    comment_content: "Bloody brilliant!",
  },
  {
    post_id: 1,
    user_id: 3,
    comment_content: "This is phenomenal, and works!",
  },
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment;
