const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-route");
const dashboardRoutes = require("./dashboard-route.js");

router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/", homeRoutes);

module.exports = router;
