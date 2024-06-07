const { where } = require("sequelize");
const db=require("../../config/db.connection");
const ProductHandler = require("../handlers/ProductHandler");
const Product=db.products;
const Merchant=db.merchants;

//----------------------------------------save Product--------------------------------
exports.saveProduct=async(req,res,next)=>{
    const m_id=req.params.merchant_id;
    const product=req.body;
    try{
        const merchant=await Merchant.findByPk(m_id);
        if(merchant){
            Product.create(product,product.merchantId=m_id)
            return res.status(201).json({message:`Product has been created with merchant id ${m_id}`,body:product,status:"success"})
        }
        throw new ProductHandler("Invalid Merchant Id");
    }
    catch(err)
    {
        next(err);
    }
}


//-------------------------update product--------------------------------------------------
exports.updateProduct=async(req,res,next)=>{
    const pid=req.params.id;
    const product=req.body;
    try{
        const p1=await Product.findByPk(pid);
        if(p1){
            // p1.pname=product.pname;
            // p1.price=product.price;
            Product.create(product,{where:{id:p1.id}});
            return res.status(202).json({message:"Product has been Updated",body:product,status:"success"})
        }
        throw new ProductHandler("Invalid Product Id")
    }
    catch(err)
    {
        next(err);
    }
}



//---------------------------------------------product by id-----------------------------------
exports.findProductById=async(req,res,next)=>{
    const id=req.params.id;
    try{
        const product=await Product.findByPk(id);
        if(product)
            {
                return res.status(200).json({message:"Product found with entered id",body:product,status:"success"})
            }
            throw new ProductHandler("No Product found with entered Id")
    }
    catch(err)
    {
     next(err);
    }
}


//-----------------------find all products----------------------------------------
exports.findAllProducts=async(req,res,next)=>{
    try{
        const products=await Product.findAll({include:"users"});
        if(products.length!=0)
            {
                return res.status(200).json({message:"product data found",body:products,status:"success"})
            }
            throw new ProductHandler("No Products found")
    }
    catch(err)
    {
        next(err)
    }
}

//-----------------------------------delete products-----------------------------------
exports.deleteProduct=async(req,res,next)=>{
    const id=req.params.id;
    try{
        const product=await Product.findByPk(id);
        if(product)
            {
                Product.destroy({where:{id:id}});
                return res.status(202).json({message:"Product has been deleted",body:product,status:"success"})
            }
            throw new ProductHandler("No Product found with entered Id")
    }
    catch(err)
    {
        next(err)
    }
}