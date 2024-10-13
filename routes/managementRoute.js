const express = require("express");
const router = express.Router();
const utilities = require("../utilities");
const managementController = require("../controllers/managementController");
const regValidate = require("../utilities/register-validation");

//get
router.get("/", utilities.handleErrors(managementController.buildManagement));
router.get("/new-classification", utilities.handleErrors(managementController.buildNewClassification));
router.get("/new-vehicle", utilities.handleErrors(managementController.buildNewVehicle));

// post
router.post(
  "/new-classification",
  regValidate.registrationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(managementController.registerClassification)
);
router.post(
  "/new-vehicle",
  regValidate.registrationChek(),
  regValidate.checkCarData,
  utilities.handleErrors(managementController.registerNewCar)
);

module.exports = router;