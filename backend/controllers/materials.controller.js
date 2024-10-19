import { User } from "../models/User/user.model.js";
import { Materials } from "../models/Materials/materials.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { MMainInfo } from "../models/Materials/info.model.js";
import { MItemInfo } from "../models/Materials/iteminfo.model.js";
import { MAttachment } from "../models/Materials/attachment.model.js";
import { MBillingTerm } from "../models/Materials/billingterm.model.js";
import { MApprovalHistory } from "../models/Materials/approvalhis.model.js";
import { MChangeHistory } from "../models/Materials/changehis.model.js";

// Main Info --------------------------------------------------------------------------------
const addMainInfo = asyncHandler(async (req, res) => {
  const {
    business_unit,
    financial_year,
    document_type,
    document_date,
    document_no,
    supplier,
    parent_account,
    quotation_no,
    quotation_date,
    party_ref_no,
    rate_basis,
    credit_period,
    days_from,
    approval_note,
    remark,
  } = req.body;
  const { body } = req;

  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "materials",
      },
    },
  });
  let material_id = user.projects[0].insights.materials._id;
  const main_info = await MMainInfo.create({
    ...body,
  });
  await main_info.save();
  material_id = material_id.toString();
  const material = await Materials.findById(material_id);
  material.main_info.push(main_info);
  await material.save();

  const change_history = await MChangeHistory.create({
    changed_by: req.user.username,
    changed_section: "Main Info",
  });
  await change_history.save();
  material.change_history.push(change_history);
  await material.save();
  res
    .status(200)
    .send({ message: "Main Info Saved", success: true, main_info });
});

const getMainInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "materials",
        populate: {
          path: "main_info",
        },
      },
    },
  });
  let main_info = user.projects[0].insights.materials.main_info;
  return res
    .status(200)
    .send({ message: "Fetched Main Info", success: true, main_info });
});

const deleteMainInfo = asyncHandler(async (req ,res) => {
  const { id } = req.body;
  if(!id){
    return res.status(500).send({message : "Main Info not found" , success : false})
  }
  const maininfo = await MMainInfo.findByIdAndDelete(id);
  res.status(200).send({message : "Main Info Deleted" , success: true , maininfo})
})

//Item Info ------------------------------------------------------------------------------------------------
const addItemInfo = asyncHandler(async (req, res) => {
  const { code, description, unit, quantity, rate, amount, terms } = req.body;
  const { body } = req;

  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "materials",
      },
    },
  });

  let material_id = user.projects[0].insights.materials._id;
  const iteminfo = await MItemInfo.create({
    ...body,
  });
  await iteminfo.save();
  material_id = material_id.toString();
  const material = await Materials.findById(material_id);
  material.item_info.push(iteminfo);
  await material.save();

  const change_history = await MChangeHistory.create({
    changed_by: req.user.username,
    changed_section: "Item Info",
  });
  await change_history.save();
  material.change_history.push(change_history);
  await material.save();

  const approval_history = await MApprovalHistory.create({
    code: code,
    description:description,
    amount:amount,
    created_by:req.user.username,
  
  });
  await approval_history.save();
  material.approval_history.push(approval_history);
  await material.save();
  res.status(200).send({ message: "Item Info Saved", success: true, iteminfo });
});

const getItemInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "materials",
        populate: {
          path: "item_info",
        },
      },
    },
  });
  let iteminfo = user.projects[0].insights.materials.item_info;
  return res
    .status(200)
    .send({ message: "Fetched Item Info", success: true, iteminfo });
});

const deleteItemInfo = asyncHandler(async (req ,res) => {
  const { id } = req.body;
  if(!id){
    return res.status(500).send({message : "Item Info not found" , success : false})
  }
  const itemInfo = await MItemInfo.findByIdAndDelete(id);
  res.status(200).send({message : "Item Info Deleted" , success: true , itemInfo})
})

//Attachment ------------------------------------------------------------------------------------------------
const addAttachment = asyncHandler(async (req, res) => {
  const { name, category, uploaded_on, remark, document_date, document_no } =
    req.body;
  const { body, imageUrl } = req;
  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "materials",
      },
    },
  });
  let material_id = user.projects[0].insights.materials._id;
  const attachment = await MAttachment.create({
    ...body,
    displayFile: imageUrl,
  });
  await attachment.save();
  material_id = material_id.toString();
  const material = await Materials.findById(material_id);
  material.attachment.push(attachment);
  await material.save();

  const change_history = await MChangeHistory.create({
    changed_by: req.user.username,
    changed_section: "Attachment Info",
  });
  await change_history.save();
  material.change_history.push(change_history);
  await material.save();

  

  res
    .status(200)
    .send({ message: "Attachment Saved", success: true, attachment });
});

const getAttachment = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "materials",
        populate: {
          path: "attachment",
        },
      },
    },
  });
  let attachment = user.projects[0].insights.materials.attachment;
  return res
    .status(200)
    .send({ message: "Fetched Attachment", success: true, attachment });
});

const deleteAttachment = asyncHandler(async (req ,res) => {
  const { id } = req.body;
  if(!id){
    return res.status(500).send({message : "Attachment not found" , success : false})
  }
  const attachment = await MAttachment.findByIdAndDelete(id);
  res.status(200).send({message : "Attachment Deleted" , success: true , attachment})
})

//Billing Term ----------------------------------------------------------------------------------------------
const addBillingTerm = asyncHandler(async (req, res) => {
  const { basic, igst, discount, round_of, gross, net } = req.body;
  const { body } = req;

  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "materials",
      },
    },
  });
  let material_id = user.projects[0].insights.materials._id;
  const billing_term = await MBillingTerm.create({
    ...body,
  });
  await billing_term.save();
  material_id = material_id.toString();
  const material = await Materials.findById(material_id);
  material.billing_term.push(billing_term);
  await material.save();

  const change_history = await MChangeHistory.create({
    changed_by: req.user.username,
    changed_section: "Billing Term",
  });
  await change_history.save();
  material.change_history.push(change_history);
  await material.save();
  res
    .status(200)
    .send({ message: "Billing Term Saved", success: true, billing_term });
});

const getBillingTerm = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "materials",
        populate: {
          path: "billing_term",
        },
      },
    },
  });
  let billing_term = user.projects[0].insights.materials.billing_term;
  return res
    .status(200)
    .send({ message: "Fetched Billing Term", success: true, billing_term });
});

const deleteBillingTerm = asyncHandler(async (req ,res) => {
  const { id } = req.body;
  if(!id){
    return res.status(500).send({message : "Billing Term not found" , success : false})
  }
  const billingterm = await MBillingTerm.findByIdAndDelete(id);
  res.status(200).send({message : "Billing Term Deleted" , success: true , billingterm})
})

//Approval History -------------------------------------------------------------------------------
const addApprovalHistory = asyncHandler(async (req, res) => {
  const { approved_by, level, status, date, time, remark, created_by } =
    req.body;
  const { body } = req;

  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "materials",
      },
    },
  });
  let material_id = user.projects[0].insights.materials._id;
  const approval_history = await MApprovalHistory.create({
    ...body,
  });
  await approval_history.save();
  material_id = material_id.toString();
  const material = await Materials.findById(material_id);
  material.approval_history.push(approval_history);
  await material.save();

  const change_history = await MChangeHistory.create({
    changed_by: req.user.username,
    changed_section: "Approval History",
  });
  await change_history.save();
  material.change_history.push(change_history);
  await material.save();
  res.status(200).send({
    message: "Approval History Saved",
    success: true,
    approval_history,
  });
});

const approveItem = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(500).send({ message: "Not found", success: false });
  }
  const approve = await MApprovalHistory.findByIdAndUpdate(
    id,
    { status: "Approved" ,
      approved_by: req.user.username,
      approval_date: new Date()
    },
    { new: true }
  );
  res.status(200).send({
    message: "Item Approved",
    success: true,
    approve,
  });
});

const getApprovalHistory = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "materials",
        populate: {
          path: "approval_history",
        },
      },
    },
  });
  let approval_history = user.projects[0].insights.materials.approval_history;
  return res.status(200).send({
    message: "Fetched Approval History",
    success: true,
    approval_history,
  });
});

//Change  History ------------------------------------------------------------------------------------------------
const getChangeHistory = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "materials",
        populate: {
          path: "change_history",
        },
      },
    },
  });

  let change_history = user.projects[0].insights.materials.change_history;
  console.log(change_history);
  return res.status(200).send({
    message: "Fetched Change History",
    success: true,
    change_history,
  });
});

export {
  addMainInfo,
  getMainInfo,
  deleteMainInfo,
  addItemInfo,
  getItemInfo,
  deleteItemInfo,
  addAttachment,
  getAttachment,
  deleteAttachment,
  addBillingTerm,
  getBillingTerm,
  deleteBillingTerm,
  addApprovalHistory,
  approveItem,
  getApprovalHistory,
  getChangeHistory,
};
