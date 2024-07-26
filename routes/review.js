const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview,isLogged,isReviewAuthor} = require("../middleware.js");
const reviewController = require('../controllers/reviews.js');

//Reviews
router.post("/",
validateReview,
isLogged,
wrapAsync(reviewController.createReview));

//delete review route
router.delete("/:reviewId",
isLogged,
isReviewAuthor,
wrapAsync(reviewController.deleteReview));

module.exports = router;
