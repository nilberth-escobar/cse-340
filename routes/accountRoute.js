/* *******************************
* Accounts Routes
* Week 4
* ******************************* */
const express = require("express")
const router = new express.Router()
const regValidate = require('../utilities/account-validation')
const utilities = require("../utilities/")
const accountController = require("../controllers/accountController")


/* *******************************
* Deliver Login View
* Week 4
* ******************************* */
router.get("/login", utilities.handleErrors(accountController.buildLogin))
router.get("/register", utilities.handleErrors(accountController.buildRegister));


// Process the registration data
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )
  


module.exports = router