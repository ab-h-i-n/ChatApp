import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes.js';

const app = express();

// Add CORS middleware before defining routes
app.use(cors({
    origin: 'https://chat-app-frontend-hazel.vercel.app'
}));

app.use(express.json({limit: '10mb'}));
app.use(router);
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const uri = process.env.MONGODB_URI;

mongoose.connect(uri)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });
