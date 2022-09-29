const joi = require("joi")

module.exports  = {
    validator:(req,res,next)=>{
        console.log("cfghjkl")
        let schema = joi.object({
            first_name: joi.string().required(),
		    last_name: joi.string().required(),
            username: joi.string().min(6).max(30).required(),
            email: joi.string().email().required(),
		    password: joi.string().min(4).max(30).required(),
		    
		  })
          console.log("cfghjkl")
          let result = schema.validate(req.body)
          console.log(result)
          if(result.error){
            res.status(400).json({
                message:result.error
            })
            return
          }
         next();
    }
}