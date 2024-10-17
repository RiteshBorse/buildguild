import { User } from "../models/User/user.model.js";
import { Materials } from "../models/Materials/materials.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { MMainInfo } from "../models/Materials/info.model.js";
import { MItemInfo } from "../models/Materials/iteminfo.model.js";
import { MAttachment } from "../models/Materials/attachment.model.js";
import { MBillingTerm } from "../models/Materials/billingterm.model.js";
import { MApprovalHistory } from "../models/Materials/approvalhis.model.js";
import { MChangeHistory } from "../models/Materials/changehis.model.js";

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

const addAttachment = asyncHandler(async (req, res) => {
  const { name, category, uploaded_on, remark, document_date, document_no } =
    req.body;
  const { imageUrl } = req;
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
  const attachment = await MAttachment.create({
    ...body,
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
  addItemInfo,
  getItemInfo,
  addAttachment,
  getAttachment,
  addBillingTerm,
  getBillingTerm,
  addApprovalHistory,
  getApprovalHistory,
  getChangeHistory,
};
