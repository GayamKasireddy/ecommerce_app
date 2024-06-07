const productController=require("../controllers/product.controller");
const express=require("express")
const router=express.Router();
router.post("/:merchant_id",productController.saveProduct);
router.put("/:id",productController.updateProduct)
router.get("/:id",productController.findProductById)
router.get("/",productController.findAllProducts)
router.delete("/:id",productController.deleteProduct)

module.exports=router;