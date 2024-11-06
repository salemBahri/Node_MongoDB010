const express=require('express');
const productRoute=require('./routes/product');
const userRoute=require('./routes/user');

require('./config/connect');

const app=express();
//accept data from frontend or postman(de typejson)
app.use(express.json());



app.use('/product',productRoute)
app.use('/user',userRoute)



app.listen(3000,()=>{
    console.log('server work');
    
});
