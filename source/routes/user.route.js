const express = require('express');
const { register, login, resetpassword } = require('../controllers/user.controller');

const router = express.Router();



router.route('/register').post(register)

router.route('/login').post(login);

router.route('/reset').post(resetpassword);

module.exports = router;