import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose

if(!cached) {
  cached = (global as any).mongoose = { 
    conn: null, promise: null 
  }
}

export const connectToDatabase = async () => {
  if(cached.conn) return cached.conn;

  if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise = 
    cached.promise || 
    mongoose.connect(MONGODB_URL, { 
      dbName: 'imaginify', bufferCommands: false 
    })

  cached.conn = await cached.promise;

  return cached.conn;
}

/*import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set("strictQuery", true);
    if(!process.env.MONGODB_URL) return console.log("MONGODB_URL not found");
    if(isConnected){
        console.log('MongoDB is already connected');
        return;
    } 
    try {
        await mongoose.connect(process.env.MONGODB_URL,
            {
                dbName: "imagify",
            });
        isConnected = true;
        console.log("MongoDB is connected");
    } catch (error) {
        console.log(error);
    }

}*/
