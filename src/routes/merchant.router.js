const merchantController=require("../controllers/merchant.controller")
const express=require('express');
const router=express.Router()

router.post("/",merchantController.saveMerchant)
router.put("/:id",merchantController.updateMerchant)
router.get("/:id",merchantController.findMerchantById)
router.get("/",merchantController.findAllMerchants)
router.delete("/:id",merchantController.deleteMerchant)

module.exports=router;