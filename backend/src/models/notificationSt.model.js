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
    forClass:{
      type:String,
      required: true
    },
    studentFullName:{
      type:String
    },
    studentEmail:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);



export const TeacherNotify = mongoose.model("TeacherNotification", notifySchema);