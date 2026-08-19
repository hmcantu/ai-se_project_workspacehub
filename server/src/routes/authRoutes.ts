import { Router } from "express";
import {
  loginController,
  meController,
  registerController,
} from "../controllers/authController";
import { requireAuth } from "../middleware/auth";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.post("/register", asyncHandler(registerController));
router.post("/login", asyncHandler(loginController));
router.get("/me", asyncHandler(requireAuth), asyncHandler(meController));

export default router;
