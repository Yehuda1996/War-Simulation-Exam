import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import { createServer } from 'http';
import connnectDb from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);

app.use(express.json());
app.use(cors());
connnectDb();


httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});