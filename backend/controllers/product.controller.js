import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).lean();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.log("Error in Fetching Products:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const createProduct = async (req, res) => {
    const body = req.body;

    // CASE 1: MULTIPLE PRODUCTS
    if (Array.isArray(body)) {
        // Validate each product
        const isInvalid = body.some(p =>
            !p.name || !p.price || !p.image
        );
        if (isInvalid)
            return res.status(400).json({ success: false, message: "Each product must have name, price, and image" });

        try {
            const newProducts = await Product.insertMany(body);
            return res.status(201).json({ success: true, data: newProducts });
        } catch (error) {
            console.error("Error inserting multiple products:", error);
            return res.status(500).json({ success: false, message: "Server Error" });
        }
    }

    // CASE 2: SINGLE PRODUCT
    if (!body.name || !body.price || !body.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    try {
        const newProduct = await Product.create(body);
        return res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error creating product:", error);
        return res.status(500).json({ success: false, message: "Server Error" });
    }
}


export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct })
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: "Invalid Product ID" });
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product Deleted" })
    } catch (error) {
        console.errlogor("Error in Deleting Product:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}