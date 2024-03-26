import { Router } from "express";

import renderRoutes from "./render.routes.js";
import authRoutes from './auth/auth.routes.js';

const router = Router();

router.use("/auth", authRoutes);
router.use("/", renderRoutes);


export default router;
