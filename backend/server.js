import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js'; // Ensure the correct import
import Product from './models/Product.model.js';  // Ensure `.js` is explicitly mentioned

dotenv.config();

const app = express();
app.use(express.json());

// Ensure Database Connection is Established Before Starting Server
connectDB().then(() => {
    console.log("Database Connected Successfully");
    
    // Start the Server After DB Connection is Successful
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error("Error connecting to database:", error.message);
    process.exit(1); // Stop the application if DB connection fails
});

// ✅ GET All Products
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find({}); // ✅ Fixed Variable Name
        return res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error("Error in Fetching products:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

// ✅ POST (Create) a New Product
app.post("/api/products", async (req, res) => {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }

    try {
        const newProduct = new Product({ name, price, image });
        await newProduct.save();
        return res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error in creating product:", error.message);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});

app.put("/api/products", async (req, res)=> {
    
})

// ✅ DELETE a Product
app.delete("/api/products/:id", async (req, res) => {
    const { id } = req.params;
    console.log("Deleting product with ID:", id);

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        return res.status(200).json({ success: true, message: "Product Deleted Successfully" });
    } catch (error) {
        console.error("Error in deleting product:", error.message); // ✅ Fixed Error Message
        return res.status(500).json({ success: false, message: "Server error" });
    }
});
