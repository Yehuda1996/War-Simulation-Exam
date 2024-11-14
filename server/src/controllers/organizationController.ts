import { Request, Response } from "express";
import jwt from "jsonwebtoken"; // Import jsonwebtoken to decode the JWT token
import Organization from "../models/organizationModel";
import userModel from "../models/userModel";

interface JwtPayload {
    username: string;
}

export const getArsenal = async (req: Request, res: Response) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1]; 
        
        if (!token) {
            res.status(401).json({ message: "No token provided" });
            return;
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        const username = decoded.username;
        if (!username) {
            res.status(400).json({ message: "Username not found in token" });
            return;
        }

        console.log("Username from token:", username);

        const user = await userModel.findOne({ username });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        let organizationName = user.organization;

        if (user.organization === "IDF" && user.area) {
            organizationName = `IDF - ${user.area}`;
        }

        const organization = await Organization.findOne({ name: organizationName });
        if (organization) {
            res.status(200).json(organization.resources);
        } else {
            res.status(404).json({ message: "Organization or area-specific arsenal not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error });
    }
};
