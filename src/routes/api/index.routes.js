import { Router } from "express";

import authRoutes from "./auth/auth.routes.js";
import userRoutes from "./users.routes.js";
import productRoutes from "./products.routes.js";

import paymentRoutes from "./payments.routes.js";

const router = Router();

router.use("/payment", paymentRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/products", productRoutes);

export default router;
