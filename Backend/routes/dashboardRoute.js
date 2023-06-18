const express = require("express");
const isAuthenticated = require("../middleware/validate");
const {getServiceProviderDashboard} = require("../controller/dashboardController")
const router = express.Router();

router.route("/").get(isAuthenticated,getServiceProviderDashboard)

module.exports = router