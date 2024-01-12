import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.API_Key,
  api_secret: process.env.API_Secret,
});

const cloudinaryUploadImg = async (filePath) => {
    try {
        if(!filePath) return console.log("local file path not found");
        const res = await cloudinary.uploader.upload(filePath,{
            resource_type: "auto",
        })
        fs.unlinkSync(filePath)
        return res
    } catch (error) {
        fs.unlinkSync(filePath);
        return null;
    }
};



const RemovecloudinaryExistingImg = async (publicId) => {
    try {

        const res = await cloudinary.uploader.destroy(publicId,{
            resource_type: "image",
        }).then((res)=>{
            console.log("done old img", res);
        }).catch((err)=>{
            console.log("error old img", err?.message);
        })
    } catch (error) {
        return null;
    }
};



export { cloudinaryUploadImg ,RemovecloudinaryExistingImg};