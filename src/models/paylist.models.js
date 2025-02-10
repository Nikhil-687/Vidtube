//   PlayLists objectId[] PlayLists
//   name string
//   discription string
//   Owner 
//   createdOn date
//   lastUpdate date


import mongoose, { Schema } from "mongoose";

const PlayListSchema = new Schema(
    {
        List:[
            {
                type: Schema.Types.ObjectId,
                ref: "Vedio"
            },
        ],
        Owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        title:{
            type: String, 
            required: true,
            trim: true,
        },
        Likes:[
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        LikesCount:
        {
            type: Number,
            required: true
        },
        readBy:[
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        comments:[
            {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }],
        vedioCount:{
            type: Number,
            required: true,
        },
        description:{
            type: String,
        },
    },{timestamps:true}
)

export const PlayList = mongoose.model("PlayList", PlayListSchema);