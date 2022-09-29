const mongoose = require("mongoose")

const user_schema = new mongoose.Schema({

    first_name:{
        type:String,
        require:true

    },
    last_name:{
         type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }


})

const user1 = new mongoose.model("data",user_schema)

module.exports = user1