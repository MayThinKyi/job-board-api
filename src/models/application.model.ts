import mongoose from "mongoose";
import { validateEmail, validatePhone } from "../utils/validate";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    candidateInfo: {
      personalInfo: {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
          validate: {
            validator: validateEmail,
            message: (props: any) =>
              `${props.value} is not a valid email address!`,
          },
        },
        phone: {
          type: String,
          required: true,
          validate: {
            validator: validatePhone,
            message: (props: any) =>
              `${props.value} is not a valid Myanmar Phone Number!`,
          },
        },
      },
      cv: {
        type: String,
        required: true,
      },
      resume: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["PENDING", "REVIEWED", "INTERVIEW", "REJECTED", "HIRED"],
      default: "PENDING",
    },
  },
  { timestamps: true },
);

const applicationModel = mongoose.model("Application", applicationSchema);

export { applicationSchema, applicationModel };
