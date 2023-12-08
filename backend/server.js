import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import productRoutes from "./routes/productRoutes.js"
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
dotenv.config();
const port = process.env.PORT || 5000;;

connectDB();//Connect to MongoDB

const app = express();

app.use(cors());
app.get('/',(req, res) => {
    res.send('API is running...');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));