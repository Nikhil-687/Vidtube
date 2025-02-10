
// content boolean
// likedBy objectId[] user

import mongoose, { Schema } from "mongoose";


const LikeSchema = new Schema(
    {
        LikeCount: {
            type: Number,
            required: true,
            index: true
        },
        Owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    },{timestamps:true}
)


export const Like = mongoose.model("Like", LikeSchema);