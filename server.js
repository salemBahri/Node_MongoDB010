const express=require('express');
const User=require('./models/user');

require('./config/connect');

const app=express();
//accept data from frontend or postman(de typejson)
app.use(express.json());

//add new user
app.post('/add',(req,res)=>{
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
app.post('/create', async(req,res)=>{

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

app.get('/getall',(req,res)=>{
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

app.get('/all',async(req,res)=>{
    try{
        //showed all user with age=20 and name='Mohamed'
        users= await User.find({age:20,name:'Mohamed'});
        res.send(users);
    }
    catch(err){
        res.send(err);
    }
    
});
//return data by id
app.get('/getbyid/:id',(req,res)=>{
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
app.get('/byid/:id',async(req,res)=>{
    try{
        myid=req.params.id;
        user= await User.findOne({_id:myid})
        res.send(user)

    }
    catch(err){
        res.send(err)
    }






});

















app.listen(3000,()=>{
    console.log('server work');
    
});
