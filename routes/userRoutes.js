const express = require('express')
const { registerController, loginController } = require('../controllers/userController')
const validate = require('../middlewares/validateMiddleware')
const {registerSchema} = require('../validations/authValidate')
const router = express.Router()

router.post('/register',validate(registerSchema), registerController)
router.post('/login', loginController)

module.exports = router