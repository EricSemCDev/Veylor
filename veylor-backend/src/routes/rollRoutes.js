import { Router } from "express";
import { handleRoll } from "../controllers/rollController.js";

const router = Router();

// Toda requisição POST para /api/roll cairá aqui
router.post("/rollQuery", handleRoll);

export default router;
