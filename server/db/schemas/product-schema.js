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
    }
}, {
    collection: 'products',
    timestamps: true,
});

export { ProductSchema };
