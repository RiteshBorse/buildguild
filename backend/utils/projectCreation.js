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
import { MApprovalHistory } from "../models/Materials/approvalhis.model.js";
import { ExtraInfo } from "../models/Administration/extrainfo.model.js";
import { Attachment } from "../models/Administration/attachment.model.js";
import { FMainInfo } from "../models/Financial/info.model.js";
import { Financial } from "../models/Financial/financial.model.js";
import { Receipt } from "../models/Financial/receipt.model.js";
import { DailyWages } from "../models/Financial/dailywages.model.js";
import { FApprovalHistory } from "../models/Financial/approvalhistory.model.js";
import { FAttachment } from "../models/Financial/attachment.model.js";


const projectCreationUtility = async (projectBody) => {

  //administration section  ------------------------------------------------------------------
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

   const materials = new Materials({
   });
   await materials.save();
   const receipt = new Receipt();
   await receipt.save();
   const financial = new Financial({receipt : receipt._id});
   await financial.save();

  //others  ----------------------------------------------------------------------------------------
  const insights = new ProjectInsight({ administration: administration._id, materials:materials._id , financials : financial._id});
  await insights.save();

  const project = await Project.create(projectBody);
  await project.save();

  project.insights = insights._id;
  await project.save();



  return project._id;
};

export { projectCreationUtility };
