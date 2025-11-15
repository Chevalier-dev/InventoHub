import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import path from 'path';

dotenv.config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 5000;
console.log("NODE ENVIRONMENT:---", process.env.NODE_ENV, "---End");
const __dirname = path.resolve();
app.use(express.json()); // Allows us to accept JSON data in request body
app.use('/api/products', productRoutes);
//production

if (process.env.NODE_ENV == 'production') {

    console.log("2.NODE ENVIRONMENT", process.env.NODE_ENV);
    app.use(express.static(path.join(__dirname, '/frontend/react-frontEnd/dist')));
    console.log("3.NODE ENVIRONMENT", process.env.NODE_ENV);
    console.log("DIRNAME:", __dirname);
    console.log("INDEX PATH:", path.join(__dirname, 'frontend', 'react-frontEnd', 'dist', 'index.html'));

    app.get(/.*/, (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'react-frontEnd', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server Started at http://localhost:" + PORT);
})


