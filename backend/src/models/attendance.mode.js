import mongoose, { Schema } from "mongoose";

const attendanceSchema = new Schema(
  {
    // Reference to the Student model
    studentID: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    studentName: {
      type: String,
      required: true,
    },
    studentEmail: {
      type: String,
      required: true,
    },
    // Reference to the Class model
    AttClass: {
      type: String,
      required: true,
    },
    // Date of the attendance record
    date: {
      type: Date,
      required: true,
    },
    // Status of the attendance (Present or Absent)
    status: {
      type: String,
      enum: ["present", "absent"],
      required: true,
    },
  
    // User ID of the teacher or admin who marked the attendance
    markedBy: {
      type: String, // Assuming you have a User model for teachers or administrators
      required: true,
    },
  },
  { timestamps: true }
);

export const Attendance = mongoose.model("Attendance", attendanceSchema);
