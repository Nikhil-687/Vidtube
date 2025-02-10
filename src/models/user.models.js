//   _id string pk
//   name string 
//   email string 
//   address string
//   watchHistory objectId[] Vedio
//   sbscribers objectId[] User
//   Playlists objectId[] Playlists
//   Vedio objectId[] Vedio
//   tweets objectId[] Tweet
//   avatar string 
//   coverImg string
//   password string
//   refresToken string
//   likedVedio objectId[] Vedio

import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const UserSchema = new Schema(
    {
        username: {
            type: String,
            // unique: true,
            required: true,
            trim: true,
            lowercase: true,
            index: true
        },
        name:{
            type: String, 
            index: true,
            // unique: true,
        },
        email:{
            type: String,
            // unique: true,
            required: true,
            trim: true,
        },
        // address:{
        //     type: String,
        // },
        avatar:{
            type: String,
            // unique: true,
            required: true,
        },
        coverImg:{
            type: String,
            // unique: true,
            // unique: false
            // required: true,
        },
        password:{
            type: String,
            // unique: true,
            // required: true,
            index: true
        },
        refresToken:{
            type: String
        },
        watchHistory:[
            {
            type: Schema.Types.ObjectId,
            ref: "Vedio"
        }],
        subscribers:[
            {
            type: Schema.Types.ObjectId,
            ref: "Subscriber"
        }],
        Playlists:[
            {
            type: Schema.Types.ObjectId,
            ref: "Playlists"
        }],
        Vedio:[
            {
            type: Schema.Types.ObjectId,
            ref: "Vedio"
        }],
        tweets:[
            {
            type: Schema.Types.ObjectId,
            ref: "Tweet"
        }],
        likedVedios:[
            {
            type: Schema.Types.ObjectId,
            ref: "Vedio"
        }],
        SubscribersCount: {
            type: Number,
        }
    },{timestamps:true}
)


UserSchema.pre('save', async function (next){
    if(!this.isModified("password"))return next();
    this.password = bcrypt.hash(this.password, 10);
    next();
})

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt(password, this.password)
}

UserSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
            _id: this._id,
            Username: this.Username
        },
        process.env.Access_Token_Secreate,
    {expiresIn: process.env.Access_Token_Expiry});
}

UserSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        {
            _id: this._id
        },
        process.env.Refresh_Token_Secreate,
    {expiresIn: process.env.Refresh_Token_Expiry});
}

export const User = mongoose.model("User", UserSchema);