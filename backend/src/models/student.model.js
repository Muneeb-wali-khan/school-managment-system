import mongoose, { Schema } from "mongoose";
import { parseDate } from "../utils/parseDate.js";

const studentSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    rollNo: {
      type: Number,
      required: true,
    },
    age:{
      type: Number,
      required: true
    },
    admissionClass: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
      enum: ["Male", "Female", "Other"],
    },
    DOB: {
      type: Date,
      required: true,
      unique: true,
    },
    monthlyFee: {
      type: Number,
      required: true,
      default: 0,
    },
    securityFee: {
      type: Number,
      required: true,
      default: 0,
    },
    labFee: {
      type: Number,
      required: true,
      default: 0,
    },
    joiningDate: {
      type: Date,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      default: null,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },

    academicHistory: [
      {
        year: {
          type: String,
          required: true,
          default: 0,
        },
        exam: {
          type: String,
          required: true,
          default: null,
        },
        pClass: {
          type: String,
          required: true,
          default: null,
        },
        grade: {
          type: String,
          required: true,
          default: null,
        },
        percentage: {
          type: Number,
          required: true,
          default: 0,
        },
        positionInClass: {
          type: String,
          required: true,
          default: null,
        },
        marksObtained: {
          type: Number,
          required: true,
          default: 0,
        },
        totalMarks: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    ],

    avatar: {
      type: String,
      required: true,
    },
    className: {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
  },
  { timestamps: true }
);




studentSchema.pre("save", async function (next) {
  if (!this.isModified("DOB", "joiningDate")) return next();

  this.DOB = parseDate(this.DOB);
  this.joiningDate = parseDate(this.joiningDate);

  next();
});

export const Student = mongoose.model("Student", studentSchema);
