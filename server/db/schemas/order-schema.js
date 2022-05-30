import { Schema } from "mongoose";

const OrderSchema = new Schema({
    userId: {
       type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    name:{
        type: String,
        required: false,
    },
    phoneNumber: { 
        type: Number,
        required: false,
    },
    
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true,
    },
    quantity:{
        type:Number,
        required: true,
    },
    total:{ 
        type:Number,
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
        required: false,
    },
    orderRequest:{
        type:String,
        
       
    },
    state:{
        type:String,
        default:"배송 준비중",
    },
    orderTime:{
        type:String,
        
    }
}, {
    timestamps: true,
    collection: "orders"
});

export { OrderSchema };
