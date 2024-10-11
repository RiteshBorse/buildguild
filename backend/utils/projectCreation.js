import { Administration } from "../models/Administration/administration.model.js";
import { AMainInfo } from "../models/Administration/info.model.js";
import { Address } from "../models/Administration/address.model.js";
import { Contact } from "../models/Administration/contact.model.js";
import { ProjectInsight } from "../models/Project/projectinsights.model.js";
import { Project } from "../models/Project/project.model.js";

import { Materials } from "../models/Materials/materials.model.js";
import { MMainInfo } from "../models/Materials/info.model.js";
import { MItemInfo } from "../models/Materials/iteminfo.model.js";
import { MAttachment } from "../models/Materials/attachment.model.js";
import { MApprovalhis } from "../models/Materials/approvalhis.model.js";

const projectCreationUtility = async (projectBody) => {

  //administration section  ------------------------------------------------------------------
  const administration_main_info = new AMainInfo();
  await administration_main_info.save();

  const address = new Address();
  await address.save();

  const contact = new Contact();
  await contact.save();

  const administration = new Administration({
    main_info: administration_main_info._id,
    address: address._id,
    contact: contact._id,
  });
  await administration.save();

  //materials section  --------------------------------------------------------------------------

  const materials_main_info = new MMainInfo();
  await materials_main_info.save();

  const materials_item_info = new MItemInfo();
  await materials_item_info.save();

  const materials_attachment = new MAttachment();
  await materials_attachment.save();

  const materials_approvalhis = new MApprovalhis();
  await materials_approvalhis.save();

  const materials = new Materials({
    main_info: materials_main_info._id,
    item_info: materials_item_info._id,
    attachment: materials_attachment._id,
    approval_history: materials_approvalhis._id
  });
  await materials.save();

  //others  ----------------------------------------------------------------------------------------
  const insights = new ProjectInsight({ administration: administration._id , materials: materials._id});
  await insights.save();

  const project = await Project.create(projectBody);
  await project.save();

  project.insights = insights._id;
  await project.save();

  return project._id;
};

export { projectCreationUtility };
