express = require('express')
userController = require('./../controller/userController')
authenticationController = require('./../controller/authenticationController')
router = express.Router()

router.route('/').get(userController.getAllUsers).post(userController.createUser)
router.route('/signup').post(authenticationController.signUp)
router.route('/login').post(authenticationController.logIn)
router.route('/:id').get(userController.getUser).delete(userController.deleteUser).patch(userController.updateUser)


module.exports = router