const utilities = require("./index");
const { body, validationResult } = require("express-validator");
const validate = {};

validate.registrationRules = () => {
  return [
    body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("Please provide a valid classification name.")
      .isAlpha("en-US", { ignore: " " })
      .withMessage(
        "Classification name must contain alphabetic characters only."
      )
      .matches(/^[A-Za-z]+$/)
      .withMessage(
        "Classification name must be alphabetic characters only without spaces."
      ),
  ];
};

validate.registrationChek = () => {
  return [
    body("inv_make")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Please provide a valid make name."),
    body("inv_model")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Please provide a valid model name."),
    body("inv_description")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Please provide a valid description."),
    body("inv_image")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Image path is required."),
    body("inv_price")
      .trim()
      .escape()
      .notEmpty()
      .matches(/^\d+(\.\d+)?$/)
      .withMessage("Please enter a valid decimal or integer value for price."),
    body("inv_year")
      .trim()
      .escape()
      .notEmpty()
      .matches(/^\d{4}$/)
      .withMessage("Please enter a 4-digit year."),
    body("inv_miles")
      .trim()
      .escape()
      .notEmpty()
      .matches(/^\d+$/)
      .withMessage("Please enter digits only for miles."),
    body("inv_color")
      .trim()
      .escape()
      .notEmpty()
      .withMessage("Color is required."),
  ];
};

validate.checkRegData = async (req, res, next) => {
  const { classification_name } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    res.render("./account/classification", {
      errors,
      title: "Classification",
      nav,
      classification_name,
    });
    return;
  }
  next();
};

validate.checkCarData = async (req, res, next) => {
  const { classification_name } = req.body;
  let errors = [];
  errors = validationResult(req);
  if (!errors.isEmpty()) {
    let nav = await utilities.getNav();
    const grid = await utilities.buildClassificationList();
    res.render("./account/vehicle", {
      errors,
      title: "Classification",
      nav,
      grid,
      classification_name,
    });
    return;
  }
  next();
};

module.exports = validate;