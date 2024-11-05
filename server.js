const express=require('express');
const User=require('./models/user');

require('./config/connect');

const app=express();
//accept data from frontend or postman(de typejson)
app.use(express.json());


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





app.get('/getall',()=>{
    console.log('get work');
    
})



app.listen(3000,()=>{
    console.log('server work');
    
});
