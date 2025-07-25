import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import productRoutes from "./routes/product.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

// Middleware to parse JSON requests
app.use(express.json());

// Log startup attempt
console.log('Starting server initialization...');

// API routes
app.use("/api/products", productRoutes);

// Emulate `__dirname` for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ==============================
// Serve Frontend in Production
// ==============================
if (process.env.NODE_ENV === "production") {
  console.log('Running in production mode, serving static files...');
  // Serve static files from the frontend's dist directory
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  // Serve index.html for unmatched routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
  });
} else {
  console.log('Running in development mode...');
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Server error, please try again',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// ==============================
// Start the Server
// ==============================
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server started successfully at http://localhost:${PORT}`);
      console.log('Environment:', process.env.NODE_ENV);
      console.log('Database connected');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer().catch(console.error);
