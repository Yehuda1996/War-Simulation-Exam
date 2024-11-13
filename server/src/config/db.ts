import mongoose from "mongoose";

const connnectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI || "");
        console.log(`Mongo Connected: ${connection.connection.host}`)
    } catch (error) {
        console.log(`${error}`)
    }
}

export default connnectDb;