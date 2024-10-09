import mongoose, { Schema } from "mongoose";

const curriculumSchema = new Schema(
  {
    curriculumClass: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
      default: 0,
    },
    month: {
      type: String,
      required: true,
      default: null,
    },
    description: {
      type: String,
      default: null
    },
    documentationLink: {
      type: String,
      default: "no link",
      validate: {
        validator: (v) => {
          const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
          return urlRegex.test(v);
        },
        message: "Invalid URL format",
      },
    },
    curriculumSubjects: {
      type: String,
      default: null
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Curriculum =  mongoose.model("Curriculums", curriculumSchema);

