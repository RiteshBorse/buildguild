import { Explore } from "../models/Explore/explore.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getPublishedProjects = asyncHandler(async (req , res)=> {
    const explore = await Explore.find({}).populate('project')
    return res.status(200).send({message : "Projects Fetched" , success : true , explore})
})

const getPublishedProjectsDetail = asyncHandler(async (req , res)=> {
    const { id } = req.params;
    console.log(id)
    const explore = await Explore.findById(id).populate('project')
    return res.status(200).send({message : "Project Details" , success : true , explore})
})

export { getPublishedProjects , getPublishedProjectsDetail }