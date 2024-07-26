const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLogged, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLogged,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.createListing));



//create new listing
router.get("/new", isLogged, listingController.renderNewForm);

router.route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(validateListing,
    isLogged,
    isOwner,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.updateListing))
  .delete(
    isLogged,
    isOwner,
    wrapAsync(listingController.deleteListing));

//Edit route
router.get("/:id/edit",
  isLogged,
  isOwner,
  wrapAsync(listingController.editListing));

module.exports = router;
