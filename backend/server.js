import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import productRoutes from "./routes/product.routes.js";

// Load environment variables based on NODE_ENV
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env";
dotenv.config({ path: envFile });

// Debug configuration
const DEBUG = process.env.DEBUG === "true";
const debugLog = (message, data = '') => {
    if (DEBUG) {
        console.log(`[DEBUG] ${message}`, data);
    }
};

const app = express();
const PORT = process.env.PORT || 5000;

debugLog('Environment:', process.env.NODE_ENV);
debugLog('MongoDB URI:', process.env.MONGO_URI ? 'URI is set' : 'URI is missing');
debugLog('Server Port:', PORT);

// Middleware to parse JSON requests
app.use(express.json());

// Debug middleware for API requests
if (DEBUG) {
    app.use((req, res, next) => {
        debugLog(`${req.method} ${req.url}`, {
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    });
}

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
    debugLog('Running in production mode');
    // Serve static files from the frontend's dist directory
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // Serve index.html for unmatched routes
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    });

} else {
    debugLog('Running in development mode');
    // Fallback for development environment
    app.get("/", (req, res) => {
        res.send("API is running...");
    });
}

// ==============================
// Start the Server
// ==============================
app.listen(PORT, () => {
    connectDB().then(() => {
        debugLog('Database connection successful');
    }).catch(error => {
        debugLog('Database connection failed:', error.message);
    });
    console.log(`Server started at http://localhost:${PORT}`);
});
