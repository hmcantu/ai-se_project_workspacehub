import { Schema, model, Types, type InferSchemaType } from "mongoose";

const organizationSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    featureFlags: {
      scheduling: {
        type: Boolean,
        default: true,
      },
      advancedReports: {
        type: Boolean,
        default: true,
      },
      customBranding: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

export type OrganizationDocument = InferSchemaType<
  typeof organizationSchema
> & {
  _id: Types.ObjectId;
};

export const Organization = model<OrganizationDocument>(
  "Organization",
  organizationSchema,
);
