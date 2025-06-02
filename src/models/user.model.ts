import mongoose, { mongo } from "mongoose";
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
    personalInfo: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phone: {
        type: String,
        required: true,
        validate: {
          validator: validatePhone,
          message: (props: any) =>
            `${props.value} is not a valid Myanmar Phone Number!`,
        },
      },
      dateOfBirth: { type: Date, required: true },
      occupation: { type: String },
      gender: {
        type: String,
        enum: ["MALE", "FEMALE", "OTHER"],
        required: true,
      },
      country: { type: String, required: true },
      city: { type: String, required: true },
      address: { type: String, required: true },
      postalCode: { type: Number, required: true },
      linkedinUrl: { type: String, required: true },
    },
    experience: [
      {
        position: { type: String, required: true },
        companyName: { type: String, required: true },
        jobType: {
          type: String,
          enum: ["FULL_TIME", "PART_TIME", "REMOTE", "FREELANCE"],
          required: true,
        },
        country: { type: String, required: true },
        currentlyWorking: { type: Boolean },
        from: { type: Date, required: true },
        to: {
          type: Date,
          required: true,
          validate: {
            validator: function (this: any, value: string) {
              if (this.currentlyWorking) {
                return value === "Present";
              } else {
                // Try converting to Date
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
        description: { type: String, required: true },
      },
    ],
    education: [
      {
        qualification: { type: String, required: true },
        institution: { type: String, required: true },
        fieldOfStudy: { type: String, required: true },
        educationLevel: {
          type: String,
          required: true,
          enum: [
            "DOCTORATE",
            "MASTER",
            "BACHELOR",
            "POST_GRADUATE",
            "DIPLOMA",
            "OTHER",
          ],
        },
        country: { type: String, required: true },
        from: { type: Date, required: true },
        to: { type: Date, required: true },
        description: { type: String, required: true },
      },
    ],
    skills: [
      {
        skill: { type: String, required: true },
        proficiency: {
          type: String,
          required: true,
          enum: ["HIGH", "MODERATE", "LOW"],
        },
      },
    ],
    languages: [
      {
        language: { type: String, required: true },
        proficiency: {
          type: String,
          required: true,
          enum: ["HIGH", "MODERATE", "LOW"],
        },
      },
    ],
    cv: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    overview: {
      aboutYourself: { type: String, minLength: 20, maxLength: 2000 },
      whyShouldWeHireYou: { type: String, minLength: 20, maxLength: 2000 },
    },
    applications: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "application",
    },
    favourites: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "job",
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model("User", userSchema);

export { userSchema, UserModel };
