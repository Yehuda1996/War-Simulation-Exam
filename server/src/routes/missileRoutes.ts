import express from "express";
import { launchAttack } from "../controllers/attackController";
import { attemptDefense } from "../controllers/defenseController";
import { verifyToken } from "../middleware/authMiddleware";


const router = express.Router();

router.post('/attack', verifyToken, launchAttack);
router.post('/defense', verifyToken, attemptDefense);

export default router;