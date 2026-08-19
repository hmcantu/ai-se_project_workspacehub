import { Schema, model, Types, type InferSchemaType } from "mongoose";

const projectSchema = new Schema(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export type ProjectDocument = InferSchemaType<typeof projectSchema> & {
  _id: Types.ObjectId;
};

export const Project = model<ProjectDocument>("Project", projectSchema);
