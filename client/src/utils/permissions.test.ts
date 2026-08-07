import { describe, expect, it } from "vitest";
import type { User } from "../types/models";
import { canCreateProject, isPrivilegedRole } from "./permissions";

describe("permissions", () => {
  const createUser = (role: User["role"] | undefined): User =>
    ({
      _id: "user-1",
      firstName: "Test",
      lastName: "User",
      email: "test@workspacehub.dev",
      role,
      organizationId: "org-1",
    }) as User;

  describe("isPrivilegedRole", () => {
    it("returns true for owner role", () => {
      expect(isPrivilegedRole("owner")).toBe(true);
    });

    it("returns true for admin role", () => {
      expect(isPrivilegedRole("admin")).toBe(true);
    });

    it("returns false for member role", () => {
      expect(isPrivilegedRole("member")).toBe(false);
    });

    it("returns false for missing/null role", () => {
      expect(isPrivilegedRole(null)).toBe(false);
      expect(isPrivilegedRole(undefined)).toBe(false);
    });
  });

  describe("canCreateProject", () => {
    it("returns true for user with owner role", () => {
      expect(canCreateProject(createUser("owner"))).toBe(true);
    });

    it("returns true for user with admin role", () => {
      expect(canCreateProject(createUser("admin"))).toBe(true);
    });

    it("returns false for user with member role", () => {
      expect(canCreateProject(createUser("member"))).toBe(false);
    });

    it("returns false for null user", () => {
      expect(canCreateProject(null)).toBe(false);
    });
  });
});