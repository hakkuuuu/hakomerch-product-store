import dotenv from 'dotenv';
import { connectDB } from './db.js';
import { seedProducts } from './seedData.js';
import Product from '../models/product.model.js';

// Load environment variables
dotenv.config();

const importData = async () => {
    try {
        await connectDB();

        // Clear existing data
        await Product.deleteMany({});
        console.log('Existing products deleted');

        // Insert seed data
        const createdProducts = await Product.insertMany(seedProducts);
        console.log(`${createdProducts.length} products imported successfully`);

        process.exit(0);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Run the seeder
importData(); 