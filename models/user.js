//import mongoose
const mongoose=require('mongoose');

const User=mongoose.model('User',{
    name:{
        type:String
    },
    lastname:{
        type:String
    },
    age:{
        type:String
    },
    //add 2 columns
    email:{
        type:String
    },
    password:{
        type:String
    }

})

module.exports=User;