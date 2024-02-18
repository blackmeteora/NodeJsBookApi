import express from 'express';
import connectDB from './database';
import router from './router';

// Initialize Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
connectDB();

// Add main router for routes
app.use('/api', router);



// Start server
const PORT = process.env.PORT || 3000;

export const appServer = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;