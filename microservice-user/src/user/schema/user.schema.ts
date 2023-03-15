import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    name:{type:String, require:true},
    username:{type:String, require:true},
    email:{type:String, require:true},
    password:{type:String, require:true},
},{
    timestamps:true
}
);

UserSchema.index({name:1}, {unique:true});
UserSchema.index({email:1}, {unique:true});