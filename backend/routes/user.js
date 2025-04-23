const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { verify, isLoggedIn } = require('../auth');

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get('/:id', verify, isLoggedIn, userController.getProfile);

//[SECTION] Route for setting user as admin
router.patch("/:id/set-as-admin", verify, isLoggedIn, userController.setUserAsAdmin);

//[SECTION] Route for updating password
router.patch("/update-password", verify, userController.updatePassword);

module.exports = router;
