const utilities = require("../utilities");
const accountModel = require("../models/management-model");
const detailModel = require("../models/inventory-model");

/* ***************************
 *  Build management view
 * ************************** */
async function buildManagement(req, res, next) {
  let nav = await utilities.getNav();
  const classificationSelect = await utilities.buildClassificationList();
  res.render("./inventory/management", {
    title: "Vehicle Management",
    nav,
    classificationSelect,
  });
}
/* ***************************
 *  Build management New Classification
 * ************************** */
async function buildNewClassification(req, res, next) {
  let nav = await utilities.getNav();
  res.render("./account/classification", {
    title: "New Classification",
    nav,
    errors: null,
  });
}
/* ***************************
 *  Build management New Vehicle
 * ************************** */
async function buildNewVehicle(req, res, next) {
  let nav = await utilities.getNav();
  const grid = await utilities.buildClassificationList();
  res.render("./account/new-vehicle", {
    title: "New Vehicle",
    nav,
    grid,
    errors: null,
  });
}
/* ****************************************
 *  Process Classification
 * *************************************** */
async function registerClassification(req, res) {
  let nav = await utilities.getNav();
  const { classification_name } = req.body;

  const regResult = await accountModel.registerAccount(classification_name);

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${classification_name}.`
    );
    res.status(201).render("./account/classification", {
      title: "New Classification",
      nav,
      errors: null,
    });
  } else {
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("./account/classification", {
      title: "New Classification",
      nav,
    });
  }
}

async function registerNewCar(req, res) {
  let nav = await utilities.getNav();
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
  } = req.body;

  const regResult = await accountModel.registerNewCar(
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id
  );

  if (regResult) {
    const grid = await utilities.buildClassificationList();
    req.flash("notice", `Congratulations, you've registered ${inv_model}.`);
    res.status(201).render("./account/vehicle", {
      title: "New Vehicle",
      nav,
      grid,
      errors: null,
    });
  } else {
    const grid = await utilities.buildClassificationList();
    req.flash("notice", "Sorry, the registration failed.");
    res.status(501).render("./account/vehicle", {
      title: "New Vehicle",
      nav,
      grid,
      errors: [{ msg: "Vehicle registration failed." }],
    });
  }
}

module.exports = {
  buildManagement,
  buildNewClassification,
  buildNewVehicle,
  registerClassification,
  registerNewCar,
};