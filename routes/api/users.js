const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../../controllers/user.controller');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/session', passport.authenticate('jwt', { session: false }), controller.session);

module.exports = router;