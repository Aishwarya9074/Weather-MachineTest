import mongoose from "mongoose";

mongoose.connect("mongodb://0.0.0.0:27017/WeatherDB").then(()=>{
    console.log("weatherApp is connected")
})
.catch(e=>{
    console.log(e)
})
export default mongoose