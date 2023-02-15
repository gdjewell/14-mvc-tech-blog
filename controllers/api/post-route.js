const express = require("express");
const router = express.Router();
const { Post, User, Comment } = require("../../models");
const authenticated = require("../../utils/auth");

/* router.get("/", authenticated, (req, res) => {
  Post.findAll({
    order: [["created_at", "DESC"]],
    attributes: ["id", "title", "post-content", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })

    .then((post) => {
      console.log(post);
      res.json(post);
    })
    .catch((err) => res.status(500).json(err));
});

router.get("/:id", authenticated, (req, res) => {
  Post.findOne({
    attributes: ["id", "title", "post-content", "created_at"],
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
        attributes: ["username"],
      },

      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

*/
// creates new post.

router.post("/", authenticated, (req, res) => {
  Post.create({
    title: req.body.title,
    post_content: req.body.post_content,
    user_id: req.session.user_id,
  })
    .then((post) => res.json(post))
    .catch((err) => {
      res.status(500).json(err);
    });
});

// updates post on the edit form

router.put("/:id", authenticated, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post_content: req.body.post_content,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )

    .then((post) => res.json(post))
    .catch((err) => {
      res.status(500).json(err);
    });
});

//deletes post from edit form

router.delete("/:id", authenticated, (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })

    .then((userData) => {
      if (!deletedPost) {
        res.json({ message: "Couldn't find post with this ID" });
      }
      res.json(deletedPost);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
