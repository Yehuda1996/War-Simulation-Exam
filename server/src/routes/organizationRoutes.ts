import express from "express";
import { getArsenal } from "../controllers/organizationController";
import { verifyToken } from "../middleware/authMiddleware";

const router = express.Router();

router.get('/arsenal', getArsenal);

export default router;