import mongoose from 'mongoose'

// Debug configuration
const DEBUG = process.env.DEBUG === "true";
const debugLog = (message, data = '') => {
    if (DEBUG) {
        console.log(`[DEBUG][DB] ${message}`, data);
    }
};

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const connectDB = async () => {
    const MAX_RETRIES = 3;
    let retryCount = 0;

    while (retryCount < MAX_RETRIES) {
        try {
            debugLog(`Connection attempt ${retryCount + 1} of ${MAX_RETRIES}`);
            
            // Simplified connection options
            const options = {
                serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
                socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            };

            // Parse connection details for debugging
            const mongoUrl = new URL(process.env.MONGO_URI);
            debugLog('Connection details:', {
                host: mongoUrl.hostname,
                database: mongoUrl.pathname.slice(1),
                username: mongoUrl.username
            });

            const conn = await mongoose.connect(process.env.MONGO_URI, options);
            
            debugLog('MongoDB connection successful:', {
                host: conn.connection.host,
                database: conn.connection.name
            });

            // Test the connection with a simple query
            const collections = await conn.connection.db.listCollections().toArray();
            debugLog('Available collections:', collections.map(c => c.name));

            console.log(`MongoDB Connected: ${conn.connection.host}`);
            return conn;
        } catch (error) {
            debugLog('MongoDB connection error:', {
                name: error.name,
                message: error.message,
                code: error.code || 'N/A',
                codeName: error.codeName || 'N/A',
                attempt: retryCount + 1
            });
            
            if (error.message.includes('IP that isn\'t whitelisted')) {
                console.log('\nIP Whitelist Error:');
                console.log('1. Go to MongoDB Atlas dashboard');
                console.log('2. Click "Network Access" in the left sidebar');
                console.log('3. Click "ADD IP ADDRESS"');
                console.log('4. Choose "ADD CURRENT IP ADDRESS" or "ALLOW ACCESS FROM ANYWHERE"');
                console.log('5. Wait about 1-2 minutes for the changes to take effect\n');
                
                // Wait longer for IP whitelist changes to propagate
                await wait(10000); // Wait 10 seconds before retry
            } else if (error.name === 'MongoServerSelectionError') {
                console.log('Error: Could not connect to MongoDB server. Please check your network connection.');
                await wait(5000); // Wait 5 seconds before retry
            } else if (error.message.includes('bad auth')) {
                console.log('Error: Authentication failed. Please check your database username and password.');
                break; // Don't retry auth failures
            } else {
                console.log(`Error: ${error.message}`);
                await wait(5000); // Wait 5 seconds before retry
            }

            retryCount++;
            
            if (retryCount === MAX_RETRIES) {
                console.log(`\nFailed to connect after ${MAX_RETRIES} attempts. Please check your configuration and try again.`);
                process.exit(1);
            } else {
                console.log(`\nRetrying connection (attempt ${retryCount + 1} of ${MAX_RETRIES})...`);
            }
        }
    }
}