import express from "express";
import { getArsenal } from "../controllers/organizationController";

const router = express.Router();

router.get('/arsenal', getArsenal);

export default router;