var express = require('express');
var router = express.Router();

var profileImageDataHandler = require('../datahandlers/profile-image.datahandler');
var ProfileImageBusiness = require('../business/profile-image.business');
var profileImageBusiness = new ProfileImageBusiness(profileImageDataHandler);

// TODO: Validate email

/* GET images from Google based on email. */
router.get('/:email', function(req, res, next) {
  var encodedEmail = req.params.email;

  profileImageBusiness.getEmailImage(encodedEmail)
    .done(function(result) {
      res.send({ success: true, data: result, message: "First image based on email found" });
    }, function(error) {
      next(error);
    });
});

module.exports = router;

