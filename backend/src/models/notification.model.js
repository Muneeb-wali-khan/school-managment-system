import mongoose, { Schema } from "mongoose";

const notifySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    fileLink:{
      type:String
    },
    notify:{
      type: String,
      required: true,
      enum: ["singleTeacher", "AllTeachers"],
    }
  },
  {
    timestamps: true,
  }
);



export const AdminNotify = mongoose.model("AdminNotification", notifySchema);