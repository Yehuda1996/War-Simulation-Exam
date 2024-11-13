import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import { createServer } from 'http';
import connnectDb from './config/db';
import userRoutes from './routes/userRoutes';
import organizationRoutes from './routes/organizationRoutes'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);

app.use(express.json());
app.use(cors());
connnectDb();

app.use('/api', userRoutes);
app.use('/api', organizationRoutes);

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});