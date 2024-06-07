const { where } = require("sequelize");
const db=require("../../config/db.connection");
const MerchantHandler = require("../handlers/MerchantHandler");
const Merchant=db.merchants;

//--------------------------save Merchant---------------------------------------------
exports.saveMerchant=async(req,res,next)=>{
    const merchant=req.body;
    try{
        const m1=await Merchant.create(merchant);
        if(m1!=null)
            return res.status(201).json({message:"Merchant has been Saved",body:m1,status:"success"});
        throw new MerchantHandler("Invalid Merchant Data");
    }
    catch(err)
    {
        next(err);
    }
}


//-----------------------------update Merchant----------------------------------------------
exports.updateMerchant=async(req,res,next)=>{
    const merchant=req.body;
    const id=req.params.id;
    try{
        const m1=await Merchant.findByPk(id);
        if(m1){
            Merchant.update(merchant,{where:{id:id}});
            return res.status(202).json({message:"Merchant has been updated",body:merchant,status:"success"})
        }
        throw new MerchantHandler("No Merchant found with entered id")
    }
    catch(err)
    {
        next(err)
    }
}


//---------------------------------------find Merchant by primary key-----------------------------
exports.findMerchantById=async(req,res,next)=>{
    const id=req.params.id;
    try{
        const merchant=await Merchant.findByPk(id,{include:"products"});
        if(merchant)
            {
                return res.status(200).json({message:"Merchant found",body:merchant,status:"success"})
            }
            throw new MerchantHandler("No Merchant Found With Entered Id");
    }
    catch(err)
    {
        next(err);
    }

}



//--------------------------- find all merchants------------------------------------------------
exports.findAllMerchants=async(req,res,next)=>{
    try{
        const merchants=await Merchant.findAll({include:"products"});
        // console.log(merchants)
        if(merchants.length!=0)
            {
             return res.status(200).json({message:"Merchants Data Found",body:merchants,status:"success"})   
            }
            throw new MerchantHandler("No Data Found");
    }catch(err)
    {
        next(err)
    }
}


//-----------------------------Delete Merchant By id---------------------------------------
exports.deleteMerchant=async(req,res,next)=>{
    const id=req.params.id;
    try{
        const merchant=await Merchant.findByPk(id);
        if(merchant){
            Merchant.destroy({where:{id:id}})
            return res.status(202).json({message:"Merchant has been deleted",body:merchant,status:"success"})
        }
        throw new MerchantHandler("No Merchant Found With Entered Id")
    }
    catch(err)
    {
        next(err);
    }
}