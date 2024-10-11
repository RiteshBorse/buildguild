import { User } from "../models/User/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { MMainInfo } from "../models/Materials/info.model.js";
import { MItemInfo } from "../models/Materials/iteminfo.model.js";
import { MAttachment } from "../models/Materials/attachment.model.js";
import { MApprovalhis } from "../models/Materials/approvalhis.model.js";

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
        populate: {
          path: "main_info",
        },
      },
    },
  });
  let main_info_id = user.projects[0].insights.materials.main_info._id;
  main_info_id = main_info_id.toString();
  const main_info = await MMainInfo.findByIdAndUpdate(
    main_info_id,
    { ...body },
    { new: true }
  );
  res.status(200).send({ message: "Main Info Saved", success: true });
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
  let main_info_id = user.projects[0].insights.materials.main_info._id;
  main_info_id = main_info_id.toString();
  const main_info = await MMainInfo.findById(main_info_id);
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
        populate: {
          path: "item_info",
        },
      },
    },
  });
  let item_info_id = user.projects[0].insights.materials.item_info._id;
  item_info_id = item_info_id.toString();
  const item_info = await MItemInfo.findByIdAndUpdate(
    item_info_id,
    { ...body },
    { new: true }
  );
  res.status(200).send({ message: "Item Info Saved", success: true });
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
  let item_info_id = user.projects[0].insights.materials.item_info._id;
  item_info_id = item_info_id.toString();
  const item_info = await MItemInfo.findById(item_info_id);
  return res
    .status(200)
    .send({ message: "Fetched Item Info", success: true, item_info });
});

const addAttachment = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    uploaded_on,
    size,
    view,
    action,
    remark,
    document_date,
    document_no,
  } = req.body;
  const { body } = req;

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
  let attachment_id = user.projects[0].insights.materials.attachment._id;
  attachment_id = attachment_id.toString();
  const attachment = await MAttachment.findByIdAndUpdate(
    attachment_id,
    { ...body },
    { new: true }
  );
  res.status(200).send({ message: "Attachment Saved", success: true });
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
  let attachment_id = user.projects[0].insights.materials.attachment._id;
  attachment_id = attachment_id.toString();
  const attachment = await MAttachment.findById(attachment_id);
  return res
    .status(200)
    .send({ message: "Fetched Attachment", success: true, attachment });
});

const addApprovalhis = asyncHandler(async (req, res) => {
  const {
    approved_by,
    level,status,
    date,
    time,
    remark,
    created_by
  } = req.body;
  const { body } = req;

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
  let approvalhis_id = user.projects[0].insights.materials.approval_history._id;
  approvalhis_id = approvalhis_id.toString();
  const approvalhis = await MApprovalhis.findByIdAndUpdate(
    approvalhis_id,
    { ...body },
    { new: true }
  );
  res.status(200).send({ message: "Approval History Saved", success: true });
});

const getApprovalhis = asyncHandler(async (req, res) => {
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
  let approvalhis_id = user.projects[0].insights.materials.approval_history._id;
  approvalhis_id = approvalhis_id.toString();
  const approvalhis = await MApprovalhis.findById(approvalhis_id);
  return res
    .status(200)
    .send({ message: "Fetched Approval History", success: true, approvalhis });
});



export { addMainInfo, getMainInfo, addItemInfo, getItemInfo, addAttachment, getAttachment, addApprovalhis, getApprovalhis };
