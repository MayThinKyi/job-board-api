import mongoose from "mongoose";
import { validateEmail, validatePhone } from "../utils/validate";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validateEmail,
        message: (props: any) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    personalInfo: {
      firstName: { type: String },
      lastName: { type: String },
      phone: {
        type: String,
        validate: {
          validator: validatePhone,
          message: (props: any) =>
            `${props.value} is not a valid Myanmar Phone Number!`,
        },
      },
      dateOfBirth: { type: Date },
      occupation: { type: String },
      gender: {
        type: String,
        enum: ["MALE", "FEMALE", "OTHER"],
      },
      country: { type: String },
      city: { type: String },
      address: { type: String },
      postalCode: { type: Number },
      linkedinUrl: { type: String },
    },
    experience: [
      {
        position: { type: String },
        companyName: { type: String },
        jobType: {
          type: String,
          enum: ["FULL_TIME", "PART_TIME", "REMOTE", "FREELANCE"],
        },
        country: { type: String },
        currentlyWorking: { type: Boolean },
        from: { type: Date },
        to: {
          type: Date,
          validate: {
            validator: function (this: any, value: string) {
              if (this.currentlyWorking) {
                return value === "Present";
              } else {
                const date = new Date(value);
                return !isNaN(date.getTime());
              }
            },
            message: function (this: any, props: any) {
              return this.currentlyWorking
                ? `'to' must be "Present" when currentlyWorking is true.`
                : `'to' must be a valid date string when currentlyWorking is false.`;
            },
          },
        },
        description: { type: String },
      },
    ],
    education: [
      {
        qualification: { type: String },
        institution: { type: String },
        fieldOfStudy: { type: String },
        educationLevel: {
          type: String,
          enum: [
            "DOCTORATE",
            "MASTER",
            "BACHELOR",
            "POST_GRADUATE",
            "DIPLOMA",
            "OTHER",
          ],
        },
        country: { type: String },
        from: { type: Date },
        to: { type: Date },
        description: { type: String },
      },
    ],
    skills: [
      {
        skill: { type: String },
        proficiency: {
          type: String,
          enum: ["HIGH", "MODERATE", "LOW"],
        },
      },
    ],
    languages: [
      {
        language: { type: String },
        proficiency: {
          type: String,
          enum: ["HIGH", "MODERATE", "LOW"],
        },
      },
    ],
    cv: {
      type: String,
    },
    resume: {
      type: String,
    },
    overview: {
      aboutYourself: { type: String, minLength: 20, maxLength: 2000 },
      whyShouldWeHireYou: { type: String, minLength: 20, maxLength: 2000 },
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
  },
  { timestamps: true },
);

const UserModel = mongoose.model("User", userSchema);

export { userSchema, UserModel };
