import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        res.status(403).json({ message: "No token provided." })
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = (decoded as any).username; 
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token." })
        return;
    }
}