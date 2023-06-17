import mongoose from "mongoose"

let isConnectedToDB = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if(isConnectedToDB){
        console.log("MongoDB is already connected")
        return
    }
    
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: process.env.DB,
            useNewUrlParser: true,
            useUnifiedTopology: true
    })
        
    isConnectedToDB = true
        console.log("MongoDB is connected")
        
    }catch(error){
        console.log(error)
    }

}