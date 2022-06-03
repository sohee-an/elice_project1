import { Schema } from 'mongoose';

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: "categories",
        required: true
    },
    image: {
        type: String,
        required: true
    },
    reviewTotal: {
        type: String,
        default: "없음"
    },
    ratingAvg: {
        type: String,
        default: 0
    }
}, {
    collection: 'products',
    timestamps: true,
});

export { ProductSchema };
