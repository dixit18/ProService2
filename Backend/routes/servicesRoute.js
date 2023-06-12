const isAuthenticated = require("../middleware/validate");

const express = require("express");
const {createService,getService,deleteService,getServices} = require("../controller/serviceController");

const router = express.Router();

router
  .route("/")
  .post(isAuthenticated, createService)
  .get(getServices);
router
  .route("/single/:id")
  .delete(isAuthenticated, deleteService)
  .get(getService);


module.exports = router;
