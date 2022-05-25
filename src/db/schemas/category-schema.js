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
    image: {
        type: String,
    }
}, {
    collection: 'categories',
    timestamps: true,
});

export { CategorySchema };