const merchantController=require("../controllers/merchant.controller")
const express=require('express');
const router=express.Router()

router.post("/",merchantController.saveMerchant)

module.exports=router;