const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

//index route and create route
router
  .route("/").get (wrapAsync(listingController.index))
  .post( isLoggedIn, validateListing, wrapAsync(listingController.createListing));


//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//show ,update,delete routes
router.route("/:id")
.get( wrapAsync (listingController.showListing))
.put(validateListing, isLoggedIn, isOwner, wrapAsync (listingController.updateListing))
.delete( isLoggedIn, isOwner,  wrapAsync (listingController.destroyListing));


//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync (listingController.renderEditForm));

module.exports = router;