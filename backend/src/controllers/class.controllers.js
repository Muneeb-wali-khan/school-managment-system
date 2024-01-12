import { Class } from "../models/class.model.js";
import { Teacher } from "../models/teacher.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";



//  all-classes
const allClasses  = asyncHandler(async(req, res)=>{ 
    const findclass = await Class.find({}).populate("students")

    if(!findclass){
        throw new ApiError(400, "No Classes found !")
    }

    return res.status(200).json(
      new ApiResponse(200, findclass, "class")
    )

})


// add-classes
const addClass = asyncHandler(async (req, res, next) => {
    const {className, email, fullName} = req.body;

    if([className, email, fullName].some((fields)=> fields?.trim() === "")){
        throw new ApiError(400, "all feilds are required !")
    }
    const findteacher = await Teacher.findOne({$or:[{email}, {fullName}]})
    if(!findteacher){
        throw new ApiError(400, "teacher with email/fullName not found")
    }

    const classExist = await Class.findOne({className: className?.toUpperCase()});
    const teacherExist = await Class.findById(findteacher?._id);

    if(classExist){
        throw new ApiError(400,'ClassName already exist');
    }
    if(teacherExist){
        throw new ApiError(400,'Class teacher already assigned to another class');
    }


    const classData = await Class.create({
        className: className?.toUpperCase(),
        classTeacherID: findteacher?._id,
    })

    if(!classData){
        return next(new ApiError('Class not created', 400));
    }
    return res.status(200).json(new ApiResponse(200,classData, "Class created successfully"));

})



// single class
const singleClass = asyncHandler(async(req, res)=>{

    const classer = await Class.findById(req.params?.id).populate("students classTeacherID")

    if(!classer){
        throw new ApiError(404, "class not found !")
    }

    return res.status(200).json(
        new ApiResponse(200, classer, `class ${classer?.className}`)
    )

})



// delete class
const deleteClass = asyncHandler(async(req, res)=>{

    const classer = await Class.findByIdAndDelete(req.params?.id)

    if(!classer){
        throw new ApiError(404, "class not found !")
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "deleted successfully")
    )

})



export {addClass, allClasses, deleteClass, singleClass}