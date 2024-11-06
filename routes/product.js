const express=require('express');

const router=express.Router();
const Product=require('../models/product');


//import multer
const multer=require('multer');
filename='';
const mystorage=multer.diskStorage({
    destination:'./uploads',
    filename:(req,file,redirect)=>{
        let date=Date.now();
        let fl=date +'.'+file.mimetype.split('/')[1];
        redirect(null,fl);
        filename=fl;
    }
})
const upload=multer({storage:mystorage})

/*******************  Product CRUD *********************/

router.post('/createproduct',upload.any('sound'), async(req,res)=>{

    try{
        data=req.body;
        prod=new Product(data);
        prod.sound=filename;
        saveProduct=await prod.save();
        filename='';
        res.status(200).send(saveProduct)
    }catch(error){
        res.status(400).send(error);
    }
})

//all product
router.get('/all',async(req,res)=>{
    try{
        //showed all product 
        products= await Product.find();
        res.status(200).send(products);
    }
    catch(err){
        res.status(400).send(err);
    } 
});
//product by id
router.get('/productid/:id',async(req,res)=>{
    try{
        myid=req.params.id;
        product= await Product.findOne({_id:myid})
        res.status(200).send(product)

    }
    catch(err){
        res.status(400).send(err)
    }
});
//delete product
router.delete('/deleteprod/:id',async (req,res)=>{
    try{
        myid=req.params.id;
        deletedProd= await Product.findOneAndDelete({_id:myid})
        res.status(200).send(deletedProd)
    }
    catch(err){
        res.status(400).send(err)
    }
})

//update product
router.put('/ /:id',async (req,res)=>{

    try{
        id=req.params.id
        updatedProd=req.body;
        updated=await Product.findByIdAndUpdate({_id:id},updatedProd)
        res.status(200).send(updated)
    }
    catch(err){
        res.status(400).send(err)
    }

})

    module.exports=router;