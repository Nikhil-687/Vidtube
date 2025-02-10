//   vedioFile string(url)
//   title string
//   thumbnail string 
//   discription string
//   duration number(min)
//   views number 
//   isPublished boolean
//   uplodedby objectId user
//   likes objectId[] likes
//   comments objectId[] comments
//   uploadedOn date
//   updatedOn date
//   watched boolean



import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const VedioSchema = new Schema(
    {
        vedioFile: {
            type: String,
            required: true,
            index: true
        },
        title:{
            type: String, 
            required: true,
            trim: true,
            index: true,
        },
        thumbnail:{
            type: String,
            required: true,
        },
        description:{
            type: String,
            trim: true
        },
        duration:{
            type: Number,
            required: true,
        },
        views:{
            type: Number,
            required: true,
        },
        isPublished:{
            type: Boolean,
            // unique: true,
            required: true,
            // index: true
        },
        uploadedBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        watchedBy:[
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
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
    },{timestamps:true}
)

VedioSchema.plugin(mongooseAggregatePaginate)

export const Vedio = mongoose.model("Vedio", VedioSchema);