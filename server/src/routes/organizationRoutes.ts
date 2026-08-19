import { Router } from "express";
import {
  getCurrentOrganizationController,
  updateCurrentOrganizationController,
  updateFeatureFlagsController,
} from "../controllers/organizationController";
import { requireAuth } from "../middleware/auth";
import { requireRoles } from "../middleware/authorize";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.use(asyncHandler(requireAuth));

router.get("/current", asyncHandler(getCurrentOrganizationController));
router.patch(
  "/current",
  requireRoles("owner", "admin"),
  asyncHandler(updateCurrentOrganizationController),
);
router.patch(
  "/current/feature-flags",
  requireRoles("owner", "admin"),
  asyncHandler(updateFeatureFlagsController),
);

export default router;
