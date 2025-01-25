import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// API routes
app.use("/api/products", productRoutes);

// Emulate `__dirname` for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ==============================
// Serve Frontend in Production
// ==============================
if (process.env.NODE_ENV === "production") {
    // Serve static files from the frontend's dist directory
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // Serve index.html for unmatched routes
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    });

} else {
    // Fallback for development environment
    app.get("/", (req, res) => {
        res.send("API is running...");
    });
}


// ==============================
// Start the Server
// ==============================
app.listen(PORT, () => {
    connectDB();
    console.log(`Server started at http://localhost:${PORT}`);
});
