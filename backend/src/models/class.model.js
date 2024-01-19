import mongoose, { Schema } from "mongoose";

const classSchema = new Schema({
  className: {
    type: String,
    required: true,
    trim: true,
  },
  classTeacherID: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  teachersOfClass: [
    {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
  ],
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
});

export const Class = mongoose.model("Class", classSchema);
