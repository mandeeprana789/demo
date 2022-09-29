var express = require('express');
var router = express.Router();
const homeController = require('../controller/home_controller')
const valid = require('../validation/joi').validator
/* GET home page. */
router.get('/home', homeController.get_home)
router.get('/sign_up', homeController.sign_up)
router.get('/sign_in', homeController.sign_in)
router.get('/courses', homeController.courses)
router.post('/register',valid,homeController.register)
router.post('/login', homeController.login)


module.exports = router;
