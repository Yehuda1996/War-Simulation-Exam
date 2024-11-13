import { Request, Response } from "express";
import Organization from "../models/organizationModel"
import User from "../models/userModel"


export const getArsenal = async (req: Request, res: Response) => {
    try {
        const { username } = req.body;
        console.log("Username:", username);

        const user = await User.findOne({ username });
        console.log("User  found:", user);
        if (!user) {
            res.status(404).json({ message: "User not found" })
            return;
        }

        let organizationName = user.organization;

        if (user.organization === "IDF" && user.area) {
            organizationName = `IDF - ${user.area}`;
        }
        console.log("Organization name:", organizationName);
        const organization = await Organization.findOne({ name: organizationName });
        console.log(organization);
        
        if (organization) {
            res.status(200).json(organization.resources);
        } 
        else {
            res.status(404).json({ message: "Organization or area-specific arsenal not found" });
        }
    } 
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
