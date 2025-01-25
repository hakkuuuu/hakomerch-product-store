import Product from '../models/product.model.js'; // Importing the Product model for MongoDB
import mongoose from 'mongoose'; // Importing mongoose for MongoDB ObjectId validation

// ==============================
// Get All Products
// ==============================
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}); // Fetch all products from the database
        res.status(200).json({ success: true, data: products }); // Respond with the fetched products
    } catch (error) {
        console.error("Error in fetching products", error.message); // Log the error to the console
        res.status(500).json({ success: false, message: 'Server error' }); // Respond with a 500 error
    }
}

// ==============================
// Create a New Product
// ==============================
export const createProduct = async (req, res) => {
    try {
        const { name, price, category, description } = req.body; // Extract other fields from the request body
        const image = req.file ? `/uploads/${req.file.filename}` : null; // Extract file path if uploaded

        // Validate that all required fields are provided
        if (!name || !price || !category || !description || !image) {
            return res.status(400).json({ success: false, message: 'Please provide all fields, including an image.' });
        }

        const newProduct = new Product({ name, price, category, image, description }); // Create a new Product instance

        await newProduct.save(); // Save the product to the database
        res.status(201).json({ success: true, data: newProduct }); // Respond with the created product
    } catch (error) {
        console.error("Error in creating product", error.message); // Log the error
        res.status(500).json({ success: false, message: 'Server error' }); // Respond with a 500 error
    }
}

// ==============================
// Update an Existing Product
// ==============================
export const updateProduct = async (req, res) => {
    const { id } = req.params; // Extract the product ID from the request URL
    const product = req.body; // Extract the updated product data from the request body

    // Validate if the provided ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid Product Id" });
    }

    // This is optional if you want to validate all required fields provided in the request body
    // if (!product.name || !product.price || !product.image) {
    //     return res.status(400).json({ success: false, message: "Please provide all required fields" });
    // }

    try {
        // Find the product by ID and update it with the new data
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

        // Check if the product was found and updated
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Respond with the updated product
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error("Error in updating product:", error.message); // Log the error
        res.status(500).json({ success: false, message: "Server Error" }); // Respond with a 500 error
    }
}

// ==============================
// Delete a Product
// ==============================
export const deleteProduct = async (req, res) => {
    const { id } = req.params; // Extract the product ID from the request URL

    try {
        // Find the product by ID and delete it
        const deletedProduct = await Product.findByIdAndDelete(id);

        // Check if a product was deleted
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product with the given ID does not exist' });
        }
        res.status(200).json({ success: true, message: 'Successfully deleted' }); // Respond with success
    } catch (error) {
        console.error("Error in deleting product", error); // Log the error
        res.status(500).json({ success: false, message: 'Server error' }); // Respond with a 500 error
    }
}
