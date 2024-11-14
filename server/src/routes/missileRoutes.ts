import express from "express";
import { launchAttack } from "../controllers/attackController";
import { attemptDefense } from "../controllers/defenseController";

const router = express.Router();

router.post('/attack', launchAttack);
router.post('/defense', attemptDefense);

export default router;