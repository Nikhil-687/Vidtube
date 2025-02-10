//   content string 
//   commentBy objectId user
//   likedBy objectId[] likes
//   commentedOn date
//   comment objectId comments

import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const CommentSchema = new Schema(
    {
        CommentText: {
            type: String,
            required: true,
            index: true
        },
        Head://By defult the name of the User
        {
            type: String, 
            // required: true,
            trim: true,
            index: true,
        },
        Owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
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
        CharCount:{
            type: Number,
            required: true,
        },
    },{timestamps:true}
)

CommentSchema.plugin(mongooseAggregatePaginate);

export const Comment = mongoose.model("Comment", CommentSchema);