const express = require('express');
const tourController = require('../controller/tourController');

const router = express.Router();

// router.param('id', tourController.checkID)

router.route('/top-5-cheap')
    .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats')
    .get(tourController.getTourStats);

router.route('/montly-plan/:year')
    .get(tourController.getMonthlyPlan);

router.route('/')
    .get(tourController.getAllTours)
    .post(tourController.addContent);

router.route('/:id')
    .get(tourController.getContentId)
    .patch(tourController.updateContent)
    .delete(tourController.deleteContent);

module.exports = router;