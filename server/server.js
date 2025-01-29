import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv/config'
import connectdb from './config/mongodb.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from '../server/routes/imageRoutes.js';

const PORT = process.env.PORT || 10000 ;
const app= express();
await connectdb();

app.use(express.json());
app.use(cors({
    origin: "https://pixelcanvas-frontend.onrender.com", 
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: ["Content-Type", "Authorization", "token"]
}));

app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

app.get('/', (req,res) => res.send("API Working"))

app.listen(PORT, () => console.log('Server running on port ' + PORT));
