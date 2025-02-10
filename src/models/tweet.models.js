//   content string 
//   likes objectId[] likes
//   comments objectId[] comments
//   uploadedOn date
//   updatedOn date

import mongoose, { Schema } from "mongoose";

const TweetSchema = new Schema(
    {
        TweetPara: {
            type: String,
            required: true,
            index: true
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
        comments:[
            {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }],
        readBy:[
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        CharCount:{
            type: Number,
            required: true,
        },
    },{timestamps:true}
)

export const Tweet = mongoose.model("Tweet", TweetSchema);