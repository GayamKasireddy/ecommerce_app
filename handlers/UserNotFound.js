class UserNotFound extends Error{
     constructor(message)
     {
        super(message)
     }
}

const handleError=(err,res)=>{
    res.status(402).json({message:err.message,status:"error"})
}
module.exports={UserNotFound,handleError}