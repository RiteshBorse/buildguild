import { Administration } from "../models/Administration/administration.model.js";
import { AMainInfo } from "../models/Administration/info.model.js";
import { Address } from "../models/Administration/address.model.js";
import { Contact } from "../models/Administration/contact.model.js";
import { ProjectInsight } from "../models/Project/projectinsights.model.js";
import { Project } from "../models/Project/project.model.js";
import { ExtraInfo } from "../models/Administration/extrainfo.model.js";
import { Attachment } from "../models/Administration/attachment.model.js";
const projectCreationUtility = async (projectBody) => {
  const administration_main_info = new AMainInfo();
  await administration_main_info.save();

  const extra_info = new ExtraInfo();
  await extra_info.save();

  const attachment = new Attachment();
  await attachment.save();

  const address = new Address();
  await address.save();
  const contact = new Contact();
  await contact.save();

  const administration = new Administration({
    main_info: administration_main_info._id,
    extra_info: extra_info._id,
    attachment: attachment._id,
    address: address._id,
    contact: contact._id,
  });
  await administration.save();

  const insights = new ProjectInsight({ administration: administration._id });
  await insights.save();

  const project = await Project.create(projectBody);
  await project.save();

  project.insights = insights._id;
  await project.save();

  return project._id;
};

export { projectCreationUtility };
