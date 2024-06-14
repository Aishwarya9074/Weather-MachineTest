import {Schema,model} from 'mongoose';

const WeatheSchema=new Schema({
    location: String,
    temperature: Number,
    description: String,
    icon: String,
    date: { type: Date, default: Date.now },


})

const Weather=model('Weather',WeatheSchema)
export default  Weather;