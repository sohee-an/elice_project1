import { Schema } from "mongoose";

const OrderSchema = new Schema({

}, {
    timestamps: true,
    collection: "orders"
})

export { OrderSchema }