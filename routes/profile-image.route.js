var express = require('express');
var router = express.Router();

var profileImageDataHandler = require('../datahandlers/profile-image.datahandler');
var ProfileImageBusiness = require('../business/profile-image.business');
var profileImageBusiness = new ProfileImageBusiness(profileImageDataHandler);

/* GET images from Google based on email. */
router.get('/:email',
function(req, res, next) {
  req.assert('email', 'A valid email is required.').notEmpty().isDecodedEmail();

  var errors = req.validationErrors();
  if (errors) {
    res.send({ success: false, data: errors, message: "There have been validation errors." }, 400);
    return;
  }

  next();
},
function(req, res, next) {
  var encodedEmail = req.params.email;
  var message;

  profileImageBusiness.getEmailImage(encodedEmail)
    .done(function(result) {
      if (!result) {
        message = "No images found based on that email.";
      } else {
        message = "First image based on email found.";
      }
      res.send({ success: true, data: result, message: message });
    }, function(error) {
      next(error);
    });
});

module.exports = router;

