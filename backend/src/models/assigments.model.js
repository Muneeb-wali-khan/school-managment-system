import mongoose, {Schema} from "mongoose";

const assignmentSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  docLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        return urlRegex.test(v);
      },
      message: "Invalid URL format",
    },
  },
  forClass: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true, // Assuming there's a User model for the creator
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export const Assignment = mongoose.model("Assignment", assignmentSchema);