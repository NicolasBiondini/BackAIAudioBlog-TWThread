import { Router } from "express";
import { getAudio } from "../controllers/getAudio.js";

const router = Router();

router.get("/audio", getAudio);

export { router as finalRouter };
