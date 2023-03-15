import mongoose from 'mongoose';
export const PassengerSchema = new mongoose.Schema({
    nombre:{type:String, require:true},
    email:{type:String, require:true},
})

PassengerSchema.index({email:1},{unique:true});