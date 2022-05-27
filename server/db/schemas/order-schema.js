import { Schema } from "mongoose";

const OrderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'products'
    },
    quantity: {
        type: Number,
    },
    address: {
        type: new Schema(
            {
                postalCode: String,
                address1: String,
                address2: String,
            },
            {
                _id: false,
            }
        ),
        required: false,
    }
}, {
    timestamps: true,
    collection: "orders"
})

export { OrderSchema }
