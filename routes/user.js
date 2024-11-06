const express=require('express');

const router=express.Router();
const User=require('../models/user');
//install bcrypt "npm i bcrypt"
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');


//add new account(register)
router.post('/register',async(req,res)=>{
    data=req.body;
    user=new User(data);
    salt=bcrypt.genSaltSync(10);
    cryptedPass=await bcrypt.hashSync(data.password,salt)
    user.password=cryptedPass;
    user.save()

    .then(
        (saved)=>{
            res.status(200).send(saved)
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err)
        }
    )

})


//login
router.post('/login',async(req,res)=>{
    data=req.body;
    user=await User.findOne({email:data.email});
    if (!user) {
        res.status(404).send('email or password invalid !')
    }else{
        validPass=bcrypt.compareSync(data.password,user.password)
        if (!validPass) {
            res.status(401).send('email or password invalid !')
        }else{
            //create token
            payload={
                _id:user._id,
                email:user.email,
                name:user.name
            }
            token=jwt.sign(payload,'12345');
            res.status(200).send({mytoken:token});
        }

    }
})





//ather method for add user
router.post('/create', async(req,res)=>{

    try{
        data=req.body;
        usr=new User(data);
        saveUser=await usr.save();
        res.send(saveUser)
    }catch(error){
        res.send(error);
    }
    
})

//show all users with form collection (tables)

router.get('/getall',(req,res)=>{
    User.find()
    .then(
        (users)=>{
            res.send(users);
        }
    )
    .catch(
        (err)=>{
            res.send(err);
        }
    )
    
});
//other method for show all users with form collection (tables)

router.get('/all',async(req,res)=>{
    try{
        //showed all user with age=20 and name='Mohamed'
        users= await User.find();
        res.send(users);
    }
    catch(err){
        res.send(err);
    }
    
});
//return data by id
router.get('/getbyid/:id',(req,res)=>{
    myid=req.params.id;
    User.findOne({_id:myid})
    .then(
        (user)=>{
            res.send(user)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }
    )
});

//other method for return data by id
router.get('/byid/:id',async(req,res)=>{
    try{
        myid=req.params.id;
        user= await User.findOne({_id:myid})
        res.send(user)

    }
    catch(err){
        res.send(err)
    }
});

      //delete from database
    //http://127.0.0.1:3000/delete/id
    router.delete('/delete/:id',(req,res)=>{
        id=req.params.id
        User.findOneAndDelete({_id:id})//if write User.findOneAndDelete() //then deleted first user
        .then(
            (deletedUser)=>{
                res.send(deletedUser)
            }
        )
        .catch(
            (err)=>{
            res.send(err)
            }
        )
    })

    router.delete('/del/:id',async (req,res)=>{
        try{
            myid=req.params.id;
            deletedUser= await User.findOneAndDelete({_id:myid})
            res.send(deletedUser)
        }
        catch(err){
            res.send(err)
        }
    })



    //update data
    router.put('/update/:id',async (req,res)=>{
        
            myid=req.params.id;
            updatedData=req.body;
            User.findByIdAndUpdate({_id:myid},updatedData)
            .then(
                (updatedUser)=>{
                    res.send(updatedData)
                }
            )
            .catch(
                (err)=>{
                    res.send(err)
                }
            )
       
    })


    router.put('/upd/:id',async (req,res)=>{

        try{
            id=req.params.id
            updatedData=req.body;
            updated=await User.findByIdAndUpdate({_id:id},updatedData)
            res.send(updated)
        }
        catch(err){
            res.send(err)
        }
   
    })

    module.exports=router;