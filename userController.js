const User = require('../models/users');
const Car = require('../models/car');



module.exports = { 
   
   /*index: (req, res, next) =>{
   	User.find({})
   	.then(users => {
   		res.status(200).json(users);
   	})
   	.catch(err =>{
   		next(err);
   	})
   },*/

 // validation: DONE
   index : async(req, res, next) =>{
   		const users = await User.find({});
   		res.status(200).json(users);
   },


      /* newUser :(req, res, next) =>{
  		const newUser = new User(req.body);
  		newUser.save()
  		.then( user =>{
  			res.status(201).json(user);
  		})
  		.catch( err =>{
  			next(err);
  		})
  	  }*/
      
      // validation: DONE
     newUser : async(req, res, next) =>{
   	//try{
      console.log('req.value', req.value);
   		const newUser = new User(req.body);
   		const user = await newUser.save()
   		res.status(201).json(user);

   //	}catch(err){
   		//next(err);
   //	}

   },
    // validation: DONE
    getUser: async(req, res, next) =>{
    	//const userId = req.params.userId;
      //NEW way
      const {userId} = req.value.params;
      //OLD way
      //const { userId } = req.params;
    	const user = await User.findById(userId);
    	res.status(200).json(user);
    },


    // validation: DONE
    replaceUser: async(req, res, next) =>{
    	//const userId = req.params.userId;
    	const { userId } = req.value.params;
        const newUser = req.value.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({success : true});

    },
     
     // validation: DONE
     updateUser: async(req, res, next) =>{
     	const { userId } = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({success : true});
    	
    },
    //validation:DONE
    getUserCars: async(req, res, next) =>{
      const { userId } = req.value.params;
      const user = await User.findById(userId).populate('cars');
      res.status(200).json(user.cars);
    },

    newUserCar: async(req, res, next) =>{
      const { userId } = req.value.params;
      // Create a new car
     const newCar = new Car(req.value.body);
     // Get user
     const user = await User.findById(userId);
     // Assign user as a car's seller
     newCar.seller = user;
     await newCar.save();
     
     //Add car to the user's selling array car
     user.cars.push(newCar);
     //save user
    await user.save();
    res.status(201).json(newCar);
    }

};