const express = require('express');
const userController = require('../Controllers/userController');

const router = express.Router();

router.route('/detail')
    .get(userController.getUser)
    .post(userController.postUser)


module.exports = router;