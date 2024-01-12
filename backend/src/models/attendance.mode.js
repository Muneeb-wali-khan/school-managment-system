import mongoose, { Schema } from "mongoose";

const attendanceSchema = new Schema(
  {
    // Reference to the Student model
    studentID: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    // Reference to the Class model
    classID: {
      type: Schema.Types.ObjectId,
      ref: "Class",
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
      enum: ["Present", "Absent"],
      required: true,
    },
    // Reason for the absence (optional)
    absenceReason: {
      type: String,
    },

    // Type of attendance (Present, Late Arrival, Early Departure, etc.)
    attendanceType: {
      type: String,
      enum: ["on Time", "Late Arrival", "on Leaving"],
    },
  
    // User ID of the teacher or admin who marked the attendance
    markedBy: {
      type: Schema.Types.ObjectId,
      ref: "Teacher", // Assuming you have a User model for teachers or administrators
      required: true,
    },
  },
  { timestamps: true }
);

export const Attendance = mongoose.model("Attendance", attendanceSchema);
