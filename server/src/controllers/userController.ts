import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

export const login = async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body;
        if (!username || !password){
            res.status(400).json("Username and password are required");
            return;
        }

        const user = await userModel.findOne({username});
        if(!user){
            res.status(400).json("No username found with this username");
            return;
        }
        else {
            const passwordValidity = await bcrypt.compare(password, user.password);
            if(!passwordValidity){
                res.status(400).json({message: 'Invalid password'});
                return
            }
        }

        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({message: "Login successful", token})
    } 
    catch (error: any) {
        res.status(500).json({ message: "Server error", error: error.message })
        return;
    }
}

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