const express=require("express")
const db=require("./config/db.connection")
const bodyParser=require('body-parser');
const userRoutes=require("./src/routes/user.router");
const merchantRoutes=require("./src/routes/merchant.router")
const productRoutes=require('./src/routes/product.routes');
const orderRoutes=require('./src/routes/order.routes');
const { handleError } = require("./src/handlers/UserNotFound");
const cors=require("cors")
const app=express();
const port=process.env.PORT||8888;
app.use(bodyParser.urlencoded())
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your React app's domain
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  }));
app.use(bodyParser.json())
app.use("/user",cors(),userRoutes)
app.use("/merchant",merchantRoutes)
app.use("/product",productRoutes)
app.use("/order",orderRoutes)
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