import { Router } from "express";
import {
  createProjectController,
  deleteProjectController,
  getProjectController,
  listProjectsController,
  updateProjectController,
} from "../controllers/projectController";
import { requireAuth } from "../middleware/auth";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.use(asyncHandler(requireAuth));

router.get("/", asyncHandler(listProjectsController));
router.post("/", asyncHandler(createProjectController));
router.get("/:id", asyncHandler(getProjectController));
router.patch("/:id", asyncHandler(updateProjectController));
router.delete("/:id", asyncHandler(deleteProjectController));

export default router;
