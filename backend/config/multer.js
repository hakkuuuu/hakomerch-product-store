import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs"; // Import 'fs' for file system operations

// Resolve __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the uploads directory (from .env or default to 'uploads/')
const uploadDir = path.join(__dirname, `../${process.env.UPLOADS_DIR || "uploads/"}`);

// Ensure the directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it doesn't exist
}

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Use dynamic uploads directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Generate unique filenames
    },
});

// File filter for images only
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true); // Accept image files
    } else {
        cb(new Error("Invalid file type. Only image files are allowed."), false); // Reject non-image files
    }
};

// Export the configured Multer instance
export const upload = multer({ storage, fileFilter });
