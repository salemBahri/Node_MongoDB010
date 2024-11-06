const express=require('express');

const router=express.Router();
const User=require('../models/user');


//add new user
router.post('/add',(req,res)=>{
    data=req.body;
    //create instance for insert in database
    usr=new User(data);
    //for save in DB*(mongoDB)
    usr.save()
    //this for controle request effected or not
        .then(
            (savedUser)=>{
                res.send(savedUser)
            }
        )
        .catch(
            (err)=>{
                res.send(err)
            }
        )
});
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