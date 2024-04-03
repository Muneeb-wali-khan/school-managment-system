import mongoose, { Schema } from "mongoose";
import { parseDate } from "../utils/parseDate.js";

const teacherSchema = new Schema(
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
      unique: true,
      trim: true,
      index: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    DOB: {
      type: Date,
      required: true
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      max: 11,
      min: 11,
    },
    sallary: {
      type: Number,
      default: 0,
    },
    joiningDate: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    leavingDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      required: true,
      enum: ["active", "inactive"],
      default: "active"
    },

    gender: {
      type: String,
      required: true
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    designation: {
      type: String,
      required: true,
      trim: true,
      default: "Teacher",
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    classesTaught:[
      {
        type: Schema.Types.ObjectId,
        ref: "Class",
      },
    ]
  },
  { timestamps: true }
);


// teacherSchema.pre("save", async function (next) {
//   if (!this.isModified("DOB", "joiningDate", "leavingDate")) return next();

//   this.DOB = parseDate(this.DOB);
//   this.joiningDate = parseDate(this.joiningDate);

//   next();
// });

export const Teacher = mongoose.model("Teacher", teacherSchema);
