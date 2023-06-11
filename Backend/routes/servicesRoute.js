const isAuthenticated = require("../middleware/validate");

const express = require("express");
const serviceController = require("../controller/serviceController");

const router = express.Router();

router
  .route("/")
  .post(isAuthenticated, serviceController.createService)
  .get(serviceController.getServices);
router
  .route("/single/:id")
  .delete(isAuthenticated, serviceController.deleteService)
  .get(serviceController.getService);

// router.get("/getone/:id", serviceController.getService);

module.exports = router;
