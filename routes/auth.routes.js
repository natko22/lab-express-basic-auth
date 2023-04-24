const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");
const router = require("express").Router();
const saltRounds = 12;

// signup routes
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", async (req, res, next) => {
  // const{email,password} = req.body;

  const salt = await bcryptjs.genSalt(saltRounds);
  console.log(salt);

  const hash = await bcryptjs.hash(req.body.password, salt);
  console.log(hash);

  const newUser = new User({ username: req.body.username, password: hash });
  console.log(newUser);
  await newUser.save();

  res.redirect("/profile");
});
// login routes
router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.render("auth/login", { error: "User not existent" });
    }

    const passwordsMatch = await bcryptjs.compare(
      req.body.password,
      user.password
    );

    if (!passwordsMatch) {
      return res.render("auth/login", {
        error: "Sorry the password is incorrect!",
      });
    }

    console.log(req.body);
    res.redirect("/profile");
  } catch (err) {
    next(err);
  }
});
module.exports = router;
