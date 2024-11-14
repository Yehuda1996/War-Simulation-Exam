import { Request, Response } from "express";
import Organization from "../models/organizationModel";
import Missile from "../models/missileModel";
import { getSocketInstance } from "../socketServer";


export const launchAttack = async (req: Request, res: Response) => {
    try {
      const { organizationName, missileName, target } = req.body;
      const organization = await Organization.findOne({ name: organizationName });
      const missileType = await Missile.findOne({ name: missileName });
  
      if (!organization) {
        res.status(404).json({ message: "Organization not found" });
        return;
      }
      if (!missileType) {
        res.status(404).json({ message: "Missile type not found" });
        return;
      }
  
      const missileResource = organization.resources.find(resource => resource.name === missileName);
  
      if (!missileResource || missileResource.amount <= 0) {
        res.status(400).json({ message: `Insufficient ${missileName} missiles` });
        return;
      }
  
      missileResource.amount -= 1;
      await organization.save();

      const io = getSocketInstance();
      io.emit('attack-launched', {
        message: `${missileName} launched by ${organizationName} towards ${target}`,
        remainingMissiles: missileResource.amount,
      });
  
      res.status(200).json({
        message: `${missileName} launched by ${organizationName} towards ${target}`,
        missile: missileType,
        remainingMissiles: missileResource.amount
      });
    } catch (error) {
      console.error("Error launching attack:", error);
      res.status(500).json({ message: "Error launching attack" });
    }
  };