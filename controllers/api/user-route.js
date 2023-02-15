const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
/*
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((userData) => {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;

        res.json(userData);
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  User.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ["password"] },

    include: [
      {
        model: Post,
        attributes: ["id", "title", "post-content"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_content"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
      {
        model: Post,
        attributes: ["title"],
      },
    ],
  })

    .then((userData) => {
      if (!userData) {
        res.status(404).json({ message: "No user found with this id" });
        return;
      }
      res.json(userData);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
*/

//creates new user

router.post("/signup", (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  })
    .then((userData) => {
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;

        res.json(userData);
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//logs in user.

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((userData) => {
      if (!userData) {
        res
          .status(400)
          .json({ message: "A user with that email address was not found." });
        return;
      }
      const checkPassword = userData.checkPassword(req.body.password);

      if (!checkPassword) {
        return res.status(400).json({ message: "Incorrect password entered." });
      }

      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.username = userData.username;
        req.session.loggedIn = true;

        return res.json({ user: userData, message: "You have logged in." });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
});

//logs out user

router.post("/logout", (req, res) => {
  console.log("Got here!");
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
