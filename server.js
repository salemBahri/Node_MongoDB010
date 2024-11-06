const express=require('express');
const productRoute=require('./routes/product');
const userRoute=require('./routes/user');

require('./config/connect');

const app=express();
//accept data from frontend or postman(de typejson)
app.use(express.json());



app.use('/product',productRoute)
app.use('/user',userRoute)


//endpoint for get image 
//http://127.0.0.1:3000/getimage/1730905883645.jpeg  ==>link for display image
app.use('/getimage',express.static('./uploads'))


app.listen(3000,()=>{
    console.log('server work');
    
});
