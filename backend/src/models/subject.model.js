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
        default: null,
      },
      name: {
        type: String,
        required: true,
        default: null,
      },
      code: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        sparse: true,
        default: null
      },
      description: {
        type: String,
        default: null,
      },
      documentationLink: {
        type: String,
        default: null,
        validate: {
          validator: (v) => {
            const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
            return urlRegex.test(v);
          },
          message: "Invalid URL format",
        },
      },
      keyTopics: [
        {
          type: String,
          default: null,
        },
      ],
    },
  ],
});

export const Subject = mongoose.model("Subject", subjectSchema);
