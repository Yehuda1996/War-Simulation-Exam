import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET as string || 'default-secret';  
const JWT_EXPIRATION = '1h';  

export const generateToken = (user: any): string => {
    const payload = {
        username: user.username,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });

    return token;
};
