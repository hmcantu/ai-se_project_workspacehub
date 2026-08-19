import { Router } from "express";
import {
  getUserController,
  listUsersController,
  updateUserController,
} from "../controllers/userController";
import { requireAuth } from "../middleware/auth";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.use(asyncHandler(requireAuth));

router.get("/", asyncHandler(listUsersController));
router.get("/:id", asyncHandler(getUserController));
router.patch("/:id", asyncHandler(updateUserController));

export default router;
