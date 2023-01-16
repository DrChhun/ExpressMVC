const express = require('express');
const userController = require('../Controllers/userController');

const router = express.Router();

router.route('/detail')
    .get(userController.getUser)
    .post(userController.postUser)

router.route('/detail/:id')
    .get(userController.findUser)
    .delete(userController.deleteUser)
    .put(userController.updateUser)


module.exports = router;