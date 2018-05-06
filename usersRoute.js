const express = require('express');
//const router = express.Router();
const router = require('express-promise-router')();

const UserController = require('../controllers/user');
const {validateParam,validateBody, schemas} = require('../helpers/routeHelper');

router.route('/')
   .get(UserController.index)
   .post(validateBody(schemas.userSchema),UserController.newUser);

router.route('/:userId')
   .get( validateParam(schemas.idSchema, 'userId'),UserController.getUser)
   .put([validateParam(schemas.idSchema,'userId'),
   	validateBody(schemas.userSchema)],UserController.replaceUser)
   .patch([validateParam(schemas.idSchema, 'userId'),
   	validateBody(schemas.userOptionalSchema)],UserController.updateUser);
  

router.route('/:userId/cars')
.get(validateParam(schemas.idSchema, 'userId'),UserController.getUserCars)
.post([validateParam(schemas.idSchema, 'userId'),
	validateBody(schemas.carSchema)], UserController.newUserCar);

module.exports = router;