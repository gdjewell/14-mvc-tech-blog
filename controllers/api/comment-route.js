const express = require("express");
const router = express.Router();
const { Comment } = require("../../models");
const authenticated = require("../../utils/auth");

//displays all comments if authenticated underneath a single post.

router.get("/", authenticated, (req, res) => {
  Comment.findAll()
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//creates new comment

router.post("/", authenticated, (req, res) => {
  console.log(req.body);
  Comment.create({
    comment_content: req.body.comment_content,
    post_id: req.body.post_id,
    user_id: req.session.user_id,
  })
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
