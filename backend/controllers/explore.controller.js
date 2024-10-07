import { Explore } from "../models/Explore/explore.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getPublishedProjects = asyncHandler(async (req , res)=> {
    const explore = await Explore.find({}).populate('project').populate('user')
    return res.status(200).send({message : "Projects Fetched" , success : true , explore})
})

export { getPublishedProjects }