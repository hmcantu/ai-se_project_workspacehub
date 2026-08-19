import { Schema, model, Types, type InferSchemaType } from "mongoose";

const bookingSchema = new Schema(
  {
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    startsAt: {
      type: Date,
      required: true,
    },
    endsAt: {
      type: Date,
      required: true,
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

export type BookingDocument = InferSchemaType<typeof bookingSchema> & {
  _id: Types.ObjectId;
};

export const Booking = model<BookingDocument>("Booking", bookingSchema);
