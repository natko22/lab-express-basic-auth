const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
router.get("/profile", (req, res) => {
  res.render("auth/profile");
});

const authRoutes = require("./auth.routes");
router.use("/auth", authRoutes);
// router.use("/", authRoutes);

module.exports = router;
