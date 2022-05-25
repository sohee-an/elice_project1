import { Schema } from 'mongoose';

const CategorySchema = new Schema({
    largeCategory: {
        type: String,
        required: true
    },
    mediumCategory: {
        type: String,
        required: true
    },
    //대표 이미지 이름 필드도 추후에 추가 해야됨
    image: {
        type: String,
    }
}, {
    collection: 'categories',
    timestamps: true,
});

export { CategorySchema };