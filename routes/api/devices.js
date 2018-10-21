const express = require('express');
const router = express.Router();
const passport = require('passport');
const controller = require('../../controllers/device.controller');

router.get('/', passport.authenticate('jwt', { session: false }), controller.list);
router.get('/:id', passport.authenticate('jwt', { session: false }), controller.listById);
router.post('/', passport.authenticate('jwt', { session: false }), controller.create);

module.exports = router;