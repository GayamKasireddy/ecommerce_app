const express=require("express")
const db=require("./config/db.connection")
const bodyParser=require('body-parser');
const userRoutes=require("./src/routes/user.router");
const merchantRoutes=require("./src/routes/merchant.router")
const { handleError } = require("./handlers/UserNotFound");
const app=express();
const port=process.env.PORT||6000;
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use("/user",userRoutes)
app.use("/merchant",merchantRoutes)
app.use((err,req,res,next)=>{
    handleError(err,res)
})
db.sequelize.sync({alter:false,force:false})
.then(() => {
    app.listen(port,()=>console.log("server connected successfully"));
})
.catch((err) => {
    console.log("server connection failure")
})