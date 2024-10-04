import { Administration } from "../models/Administration/administration.model.js";
import { Information } from "../models/Administration/info.model.js"
import { ProjectInsight } from "../models/Project/projectinsights.model.js";
import { Project } from "../models/Project/project.model.js";

const projectCreationUtility = async (projectBody) => {
    const main_info = new Information();
    await main_info.save();

    const administration = new Administration({main_info : main_info._id});
    await administration.save();

    const insights = new ProjectInsight({administration : administration._id});
    await insights.save();

    const project = await Project.create(projectBody);
    await project.save();

    project.insights = insights._id;
    await project.save();

    return project._id;
}

export {projectCreationUtility}