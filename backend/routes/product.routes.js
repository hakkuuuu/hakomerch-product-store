import express from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../controllers/product.controller.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.get("/", getAllProducts);

router.post("/", upload.single('image'), createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;