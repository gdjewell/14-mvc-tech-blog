const express = require("express");
const sequelize = require("../config/connection");
const { Post, User, Comment } = require("../models");
const authenticated = require("../utils/auth");
const router = require("express").Router();

//finds all posts posted by the user

router.get("/", authenticated, (req, res) => {
  Post.findAll({
    include: [{ model: User, attributes: ["username"] }],
  }).then((postInfo) => {
    const posts = postInfo.map((posts) => posts.get({ plain: true }));
    res.render("dashboard", {
      posts,
      loggedIn: req.session.loggedIn,
    });
  });
});

//sends person to new page to create a new post.

router.get("/new", authenticated, (req, res) => {
  Post.findAll({
    include: [
      {
        model: Comment,
        include: { model: User },
      },
    ],
  }).then((postInfo) => {
    const posts = postInfo.map((posts) => posts.get({ plain: true }));
    res.render("new-post", { posts, loggedIn: true });
  });
});

//renders the edit post page.

router.get("/edit/:id", authenticated, (req, res) => {
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
  }).then((postInfo) => {
    const post = postInfo.get({ plain: true });
    console.log(post);
    res.render("edit-post", { post, loggedIn: true });
  });
});

module.exports = router;
