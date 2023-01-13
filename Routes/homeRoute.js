const express = require('express');
const homeController = require('../Controllers/homeController');

const router = express.Router();

router.route('/content')
    .get(homeController.getContent)

router.route('/user')
    .get(homeController.getUser)

module.exports = router;
