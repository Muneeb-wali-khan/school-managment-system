import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema({
  subjectName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  teachers: [
    {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
  ],
  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
  ],

  curriculum: [
    {
      year: {
        type: Number,
        required: true,
        default: 0,
      },
      description: {
        type: String,
        default: "no description",
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
      keyTopics: {
        type: String,
        default: "no topics",
      },
    },
  ],
});

export const Subject = mongoose.model("Subject", subjectSchema);
