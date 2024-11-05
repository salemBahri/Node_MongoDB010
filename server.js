const express=require('express');
require('./config/connect');


const app=express();

app.post('/add',()=>{

    console.log('add work');
    
})
app.get('/getall',()=>{
    console.log('get work');
    
})






app.listen(3000,()=>{
    console.log('server work');
    
});
