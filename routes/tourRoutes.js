express = require('express')
tourController = require('./../controller/toursController')
auth = require('./../controller/authenticationController')

const router = express.Router()

// router.param('id',tourController.checkId)

router.route('/').get(auth.protectRoute,tourController.getAllTours).post(tourController.createTour)
router.route('/gettourstat').get(tourController.getTourStat)
router.route('/monthly-plan/:year').get(tourController.monthlyPlan)
router.route('/:id').get(tourController.getTour).delete(tourController.deleteTour).patch(tourController.updateTour)
module.exports = router