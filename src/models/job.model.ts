import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: ["FULL_TIME", "PART_TIME", "REMOTE", "FREELANCE"],
      required: true,
    },
    experience: {
      type: String,
      enum: ["INTERN", "JUNIOR", "MID", "SENIOR", "EXECUTIVE"],
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    status: {
      type: String,
      enum: ["OPEN", "CLOSED"],
      default: "OPEN",
    },
    location: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    description: {
      type: [String],
      required: true,
    },
    qualifications: {
      type: [String],
      required: true,
    },
    benefits: {
      type: [String],
      required: true,
    },
    isNegotiable: {
      type: Boolean,
      required: true,
    },
    salaryFrom: {
      type: Number,
    },
    salaryTo: {
      type: Number,
    },
  },
  { timestamps: true },
);

jobSchema.pre("validate", function (next) {
  if (this.isNegotiable) {
    if (!this.salaryFrom || !this.salaryTo) {
      return next(
        new Error(
          "Both salaryFrom and salaryTo are required when it is Negotiable.",
        ),
      );
    }
  }
  next();
});

const JobModel = mongoose.model("Job", jobSchema);

export { jobSchema, JobModel };
