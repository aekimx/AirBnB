const express = require("express");

const { setTokenCookie, restoreUser, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

// Middleware

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors
];

// Routes

// Log in
router.post("/", validateLogin, async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.login({ credential, password });

  if (!user) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = ["The provided credentials were invalid."];
    return next(err);
  }

  let token = await setTokenCookie(res, user);
  let signedInUser = await User.findOne({
    where: { id: user.id },
    attributes: ["id", "firstName", "lastName", "email"]
  });
  signedInUser.dataValues.token = token;
  return res.json({
    user: signedInUser
  });
});

// Log out
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

// Restore session user
router.get("/", restoreUser, requireAuth, async (req, res) => {
  const { user } = req;
  // console.log(user);
  let userId = user.dataValues.id;
  let currentUser = await User.findOne({
    where: {id: userId},
    attributes: ['id', 'firstName','lastName','email', 'username']
  })
  // let token = await setTokenCookie(res, user);
  // currentUser.dataValues.token = token;
  if (user) {
    return res.json({user: currentUser});
  } else return res.json({ user: null });
});

module.exports = router;
