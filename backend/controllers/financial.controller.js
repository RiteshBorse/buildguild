import { User } from "../models/User/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Receipt } from "../models/Financial/receipt.model.js";
import { FMainInfo } from "../models/Financial/info.model.js"
import { FApprovalHistory } from "../models/Financial/approvalhistory.model.js";
import { DailyWages } from "../models/Financial/dailywages.model.js";
import { FAttachment } from "../models/Financial/attachment.model.js";
import { Financial } from "../models/Financial/financial.model.js";
import { FChangeHistory } from "../models/Financial/changehistory.model.js";
import { populate } from "dotenv";

const addReceipt = asyncHandler(async (req, res) => {
  const {
    main_info,
    attachments,
    change_history,
    approval_history,
  } = req.body;
  const { body } = req;

  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "financials",
        populate: {
          path: "receipt"
        }
      }

    }
  })
  let receipt_id = user.projects[0].insights.financials.receipt._id;
  receipt_id = receipt_id.toString();
  const receipt = await Receipt.findByIdAndUpdate(receipt_id, { ...body }, { new: true });
  res.status(200).send({ message: "Receipt added ", success: true })
});
const getReceipt = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "financials",
        populate: {
          path: "receipt"
        }
      }
    }
  });
  let receipt_id = user.projects[0].insights.financials.receipt._id;
  receipt_id = receipt_id.toString();
  const receipt = await Receipt.findById(receipt_id);
  return res.status(200).send({ message: "Fetched Receipt", success: true, receipt })
});
const addDailyWages = asyncHandler(async (req, res) => {
  const {
    name,
    date,
    wages,
    working_hr,
    daily_rate,
  } = req.body
  const { body } = req;

  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "financials",

      }

    }
  })

  let financial_id = user.projects[0].insights.financials._id;
  const daily_wages = await DailyWages.create({
    ...body,
  });
  await daily_wages.save();
  financial_id = financial_id.toString();
  const financial = await Financial.findById(financial_id);
  financial.daily_wages.push(daily_wages);
  await financial.save();

  res.status(200).send({ message: "Daily-Wages Saved", success: true, daily_wages });
});

const getDailyWages = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "financials",
        populate: {
          path: "daily_wages",
        },
      },
    },
  });
  let daily_wages = user.projects[0].insights.financials.daily_wages;
  return res
    .status(200)
    .send({ message: "Fetched Daily Wages", success: true, daily_wages });
});

const addMainInfo = asyncHandler(async (req, res) => {
  const {
    business_unit,
    document_type,
    document_no,
    bank,
    financial_year,
    document_date,
    narration,
  } = req.body
  const { body } = req;

  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "financials",
        populate: {
          path: "receipt",
        }

      }

    }
  })

  let receipt_id = user.projects[0].insights.financials.receipt._id;
  const main_info = await FMainInfo.create({
    ...body,
  });
  await main_info.save();
  receipt_id = receipt_id.toString();
  const receipt = await Receipt.findById(receipt_id);
  receipt.main_info.push(main_info);
  await receipt.save();

  const change_history = await FChangeHistory.create({
    changed_by: req.user.username,
    changed_section: "Main Info",
  });
  await change_history.save();
  receipt.change_history.push(change_history);
  await receipt.save();

  const approval_history = await FApprovalHistory.create({
    business_unit,
    document_no,
    created_by: req.user.username,
  });
  await approval_history.save();
  receipt.approval_history.push(approval_history);
  await receipt.save();

  res
    .status(200)
    .send({ message: "Main Info Saved", success: true, main_info });



});
const deleteMainInfo = asyncHandler(async (req ,res) => {
  const { id } = req.body;
  if(!id){
    return res.status(500).send({message : "Information not found" , success : false})
  }
  const main_info = await FMainInfo.findByIdAndDelete(id);
  res.status(200).send({message : "Information Deleted" , success: true , main_info})
});
const getOneMainInfo = asyncHandler(async ( req , res) => {
    const { id } = req.body;
    const main_info = await FMainInfo.findById(id);
    res.status(200).send({message : "Main Info" , success : true, main_info
    })
});
const editMainInfo = asyncHandler(async (req , res) => {
  const { id } = req.body;
  const main_info = await FMainInfo.findByIdAndUpdate(id , ...body , {new : true});
  res.status(200).status({message : "Main Info Updated" , success : true , main_info})
})

const getMainInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "financials",
        populate: {
          path: "receipt",
          populate: {
            path: "main_info",
          }
        },
      },
    },
  });
  let main_info = user.projects[0].insights.financials.receipt.main_info;
  return res
    .status(200)
    .send({ message: "Fetched Main-Info", success: true, main_info });
});

const addApprovalHistory = asyncHandler(async (req, res) => {
  const { approved_by,status, date, business_unit, document_no, created_by } =
    req.body;
  const { body } = req;

  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "financials",
        populate: {
          path: "receipt",
        }
      },
    },
  });
  let receipt_id = user.projects[0].insights.financials.receipt._id;
  const approval_history = await FApprovalHistory.create({
    ...body,
  });
  await approval_history.save();
  receipt_id = receipt_id.toString();
  const receipt = await Receipt.findById(receipt_id);
  receipt.approval_history.push(approval_history);
  await receipt.save();

  const change_history = await FChangeHistory.create({
    changed_by: req.user.username,
    changed_section: "Approval History",
  });
  await change_history.save();
  receipt.change_history.push(change_history);
  await receipt.save();
  res.status(200).send({
    message: "Approval History Saved",
    success: true,
    approval_history,
  });
});

const approveItem = asyncHandler(async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(500).send({ message: "Not found", success: false })
  }
  const approve = await FApprovalHistory.findByIdAndUpdate(
    id,
    { status: "Approved" , approved_by : req.user.username },
    { new: true },
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
        path: "financials",
        populate: {
          path: "receipt",
          populate: {
            path: "approval_history",
          },
        },
      },
    },
  });
  let approval_history = user.projects[0].insights.financials.receipt.approval_history;
  return res.status(200).send({
    message: "Fetched Approval History",
    success: true,
    approval_history,
  });
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
        path: "financials",
        populate: {
          path: "receipt"
        }
      },
    },
  });
  let receipt_id = user.projects[0].insights.financials.receipt._id;
  const attachment = await FAttachment.create({
    ...body, display_file: imageUrl
  });
  await attachment.save();
  receipt_id = receipt_id.toString();
  const receipt = await Receipt.findById(receipt_id);
  receipt.attachment.push(attachment);
  await receipt.save();
  const change_history = await FChangeHistory.create({
    changed_by: req.user.username,
    changed_section: "Attachment Info",
  });
  await change_history.save();
  receipt.change_history.push(change_history);
  await receipt.save();
  res
    .status(200)
    .send({ message: "Attachment Saved", success: true, attachment });
});
const deleteAttachment = asyncHandler(async (req ,res) => {
  const { id } = req.body;
  if(!id){
    return res.status(500).send({message : "Attachment not found" , success : false})
  }
  const attachment = await FAttachment.findByIdAndDelete(id);
  res.status(200).send({message : "Attachment Deleted" , success: true , attachment})
})

const getAttachment = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "financials",
        populate: {
          path: "receipt",
          populate: {
            path: "attachment"
          }
        },
      },
    },
  });
  let attachment = user.projects[0].insights.financials.receipt.attachment;
  return res
    .status(200)
    .send({ message: "Fetched Attachment", success: true, attachment });
});


const getChangeHistory = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "financials",
        populate: {
          path: "receipt",
          populate: {
            path: "change_history",
          }
        },
      },
    },
  });
  let change_history = user.projects[0].insights.financials.receipt.change_history;
  return res
    .status(200)
    .send({ message: "Fetched History", success: true, change_history });
});


export {
  addReceipt,
  getReceipt,
  addMainInfo,
  getMainInfo,
  getOneMainInfo,
  editMainInfo,
  deleteMainInfo,
  addApprovalHistory,
  getApprovalHistory,
  addDailyWages,
  getDailyWages,
  addAttachment,
  deleteAttachment,
  getAttachment,
  getChangeHistory,
  approveItem,
  
};