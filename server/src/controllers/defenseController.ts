import { Request, Response } from "express";
import Organization from "../models/organizationModel";
import Missile from "../models/missileModel";
import { getSocketInstance } from "../socketServer";


export const attemptDefense = async (req: Request, res: Response) => {
    try {
      const { organizationName, defenseMissileName, incomingMissileName } = req.body;
      const organization = await Organization.findOne({ name: organizationName });
      const defenseMissile = await Missile.findOne({ name: defenseMissileName });
      const incomingMissile = await Missile.findOne({ name: incomingMissileName });
  
      if (!organization) {
        res.status(404).json({ message: "Organization not found" });
        return;
      }
      if (!defenseMissile) {
        res.status(404).json({ message: "Defense missile not found" });
        return;
      }
      if (!incomingMissile) {
        res.status(404).json({ message: "Incoming missile not found" });
        return;
      }
  
      if (!defenseMissile.intercepts.includes(incomingMissileName)) {
        res.status(400).json({ message: `${defenseMissileName} cannot intercept ${incomingMissileName}` });
        return;
      }
  
      if (incomingMissile.speed - defenseMissile.speed < 3) {
        res.status(400).json({ message: `${defenseMissileName} cannot intercept ${incomingMissileName} in time` });
        return;
      }
  
      const defenseResource = organization.resources.find(resource => resource.name === defenseMissileName);
  
      if (!defenseResource || defenseResource.amount <= 0) {
        res.status(400).json({ message: `Insufficient ${defenseMissileName} missiles for defense` });
        return;
      }
  
      defenseResource.amount -= 1;
      await organization.save();

      const io = getSocketInstance();
      io.emit('defense-attempted', {
        message: `${defenseMissileName} successfully intercepted ${incomingMissileName}`,
        remainingDefenseMissiles: defenseResource.amount,
      });
  
      res.status(200).json({
        message: `${defenseMissileName} successfully intercepted ${incomingMissileName}`,
        remainingDefenseMissiles: defenseResource.amount
      });
    } catch (error) {
      console.error("Error in defense attempt:", error);
      res.status(500).json({ message: "Error in defense attempt" });
    }
  };
  