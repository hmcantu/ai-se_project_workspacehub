import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { Organization } from "../models/Organization";
import { User, type UserDocument } from "../models/User";
import { AppError } from "../utils/appError";
import {
  requireEmail,
  requirePassword,
  requireSlug,
  requireString,
} from "../utils/validators";

const signToken = (payload: {
  userId: string;
  organizationId: string;
  role: "owner" | "admin" | "member";
}) => {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: "7d" });
};

const sanitizeUser = (user: UserDocument) => {
  return {
    _id: String(user._id),
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    organizationId: String(user.organizationId),
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const register = async (payload: Record<string, unknown>) => {
  const firstName = requireString(payload.firstName, "First name");
  const lastName = requireString(payload.lastName, "Last name");
  const email = requireEmail(payload.email);
  const password = requirePassword(payload.password);
  const organizationName = requireString(
    payload.organizationName,
    "Organization name",
  );
  const organizationSlug = requireSlug(payload.organizationSlug);

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("A user with this email already exists", 409);
  }

  const existingOrganization = await Organization.findOne({
    slug: organizationSlug,
  });
  if (existingOrganization) {
    throw new AppError("An organization with this slug already exists", 409);
  }

  const organization = await Organization.create({
    name: organizationName,
    slug: organizationSlug,
    featureFlags: {
      scheduling: true,
      advancedReports: true,
      customBranding: true,
    },
  });

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    passwordHash,
    organizationId: organization._id,
    role: "owner",
  });

  const token = signToken({
    userId: String(user._id),
    organizationId: String(organization._id),
    role: "owner",
  });

  return {
    token,
    user: sanitizeUser(user.toObject()),
    organization,
  };
};

export const login = async (payload: Record<string, unknown>) => {
  const email = requireEmail(payload.email);
  const password = requirePassword(payload.password);

  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    throw new AppError("Invalid email or password", 401);
  }

  const organization = await Organization.findById(user.organizationId);
  if (!organization) {
    throw new AppError("Organization not found", 404);
  }

  const token = signToken({
    userId: String(user._id),
    organizationId: String(user.organizationId),
    role: user.role,
  });

  return {
    token,
    user: sanitizeUser(user.toObject()),
    organization,
  };
};

export const getCurrentAuthUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const organization = await Organization.findById(user.organizationId);
  if (!organization) {
    throw new AppError("Organization not found", 404);
  }

  return {
    user: sanitizeUser(user.toObject()),
    organization,
  };
};
