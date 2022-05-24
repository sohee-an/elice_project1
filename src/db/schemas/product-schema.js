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
        type: Object,
    }
    //상품 이미지 이름 저장 필드 추가 필요
}, {
    collection: 'products',
    timestamps: true,
});

export { ProductSchema };