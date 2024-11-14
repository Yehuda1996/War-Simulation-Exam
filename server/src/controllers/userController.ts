import { Request, Response } from "express";
import userModel, { Organization, Area } from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 
import { generateToken } from "../utils/tokenUtils";

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        
        // Find the user by username
        const user = await userModel.findOne({ username });
        
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // Verify the password (assuming you have a method on your User model)
        const isPasswordValid = await bcrypt.compare(password, user.password) // Replace with actual password check
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid password" });
            return;
        }

        // Generate the token (replace with your JWT token generation logic)
        const token = generateToken(user);

        // Send back the response with token and user data
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                organization: user.organization,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const {username, password, organization, area} = req.body;
        if(!username || !password || !organization) {
            res.status(400).json("All required fields must be filled");
            return;
        }

        const existingUser = await userModel.findOne({username});
        if(existingUser) {
            res.status(400).json("Username already exists");
            return;
        }

        if (organization === Organization.idf && !area) {
            res.status(400).json("Area must be selected when organization is IDF");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel(
            {
                username,
                password: hashedPassword,
                organization,
                area
            }
        )
        await newUser.save();
        res.status(201).json({message: "User created successfully"});
        return;
    } 
    catch (error: any) {
        res.status(500).json({ message: "Server error", error: error.message })
        return;
    }
}