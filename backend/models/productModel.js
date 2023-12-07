import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    brand: {
        type: String,
        // required: true,
    },
    flavor: {
        type: String,
        // required: true,
    },
    nicotineStrength: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    category: {
        type: String,
        // required: true,
    },
    deviceType: {
        type: String,
        // required: true,
    },
    price: {
        type: Number,
        default: 0,
        required: true,
    },
    countInStock: {
        type: Number,
        default: 0,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    numReviews: {
        type: Number,
        default: 0,
        // required: true,
    },
    rating: {
        type: Number,
        default: 0,
        // required: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },

}, {
    timestamps: true
});

const Product = mongoose.model("products", productSchema);

export default Product;
