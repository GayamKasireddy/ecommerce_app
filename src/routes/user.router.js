const userController=require("../controllers/user.controller");
const express=require('express');
const router=express.Router();

router.post("/",userController.saveUser);
router.put("/:id",userController.updateUser)
router.get("/",userController.findAllUsers)
router.get("/:id",userController.findUserById)
router.delete("/:id",userController.deleteUserById)
module.exports=router;