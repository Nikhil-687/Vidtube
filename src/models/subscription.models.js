
// content boolean
// SubscriberdBy objectId[] user

import mongoose, { Schema } from "mongoose";


const SubscriberSchema = new Schema(
    {
        Subscribers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },{timestamps:true}
)


export const Subscriber = mongoose.model("Subscriber", SubscriberSchema);