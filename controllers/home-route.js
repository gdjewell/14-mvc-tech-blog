const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const authenticated = require("../utils/auth");

//gets all posts to display on the home page.

router.get("/", (req, res) => {
  Post.findAll({
    include: [
      {
        model: User,
      },
    ],
  }).then((postinfo) => {
    const postsConvert = postinfo.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      posts: postsConvert,
      loggedIn: req.session.loggedIn,
    });
  });
});

// brings up a single post with comments.

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Comment,
        include: {
          model: User,
        },
      },
      {
        model: User,
      },
    ],
  }).then((postinfo) => {
    const postConvert = postinfo.get({ plain: true });

    res.render("one-post", {
      post: postConvert,
      loggedIn: req.session.loggedIn,
    });
  });
});

// redirects to dashboard if someone logs in.

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login", {
    loggedIn: req.session.loggedIn,
  });
});

// redirects to dashboard if someone signs up.

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("signup", {
    loggedIn: req.session.loggedIn,
  });
});

module.exports = router;
