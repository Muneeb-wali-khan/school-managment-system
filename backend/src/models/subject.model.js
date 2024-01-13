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
        default: "no year",
      },
      code: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        sparse: true,
        minlength: 4,
        default: "no code"
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
      keyTopics: [
        {
          topicName: {
            type: String,
            default: "no topics",
          }
        },
      ],
    },
  ],
});

export const Subject = mongoose.model("Subject", subjectSchema);
