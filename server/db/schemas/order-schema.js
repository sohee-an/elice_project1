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
    postalCode: {
        type: String
    },
    address1: {
        type: String
    },
    address2: {
        type: String
    }
}, {
    timestamps: true,
    collection: "orders"
})

export { OrderSchema }
