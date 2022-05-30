import { Schema } from "mongoose";

const OrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    name: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: Number,
        required: false,
    },
    products: [{
        type: new Schema(
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'products',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
            {
                _id: false,
            },
        ),
        required: true,
    }],
    total: {
        type: Number,
        required: true,
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
        required: true,
    },
    orderRequest: {
        type: String,
        required: true
    },
    state: {
        type: String,
        default: "배송 준비중",
        required: true
    },
}, {
    timestamps: true,
    collection: "orders"
});

export { OrderSchema };
