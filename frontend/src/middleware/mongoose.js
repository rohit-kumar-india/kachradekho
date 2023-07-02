import mongoose from "mongoose";
const connectDb = handler => async (req,res)=>{
    if(mongoose.connections[0].readyState){
        return handler(req,res)
    }
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log('database connected successfully')
    return handler(req, res);
}

export default connectDb;