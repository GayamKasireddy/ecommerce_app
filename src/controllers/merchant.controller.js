const db=require("../../config/db.connection");
const MerchantHandler = require("../../handlers/MerchantHandler");
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