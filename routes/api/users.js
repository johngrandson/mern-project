const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../../controllers/user.controller');

router.post('/register', userController.registerController);
router.post('/login', userController.loginController);
router.get('/current', passport.authenticate('jwt', { session: false }), userController.currentController);

module.exports = router;