import { User } from "../models/User/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AMainInfo } from "../models/Administration/info.model.js";
import { Address } from "../models/Administration/address.model.js";
import { Contact } from "../models/Administration/contact.model.js";
import { ExtraInfo } from "../models/Administration/extrainfo.model.js";
import { Attachment } from "../models/Administration/attachment.model.js";

const addMainInfo = asyncHandler(async (req, res) => {
  const {
    code,
    type_info,
    segment,
    start_fin_year,
    description,
    belongs_to,
    zone,
    start_date,
  } = req.body;
  const {body} = req;

  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "administration",
        populate : {
            path : "main_info"
        }
      }
    }
  });
  let main_info_id = user.projects[0].insights.administration.main_info._id;
  main_info_id = main_info_id.toString();
  const main_info = await AMainInfo.findByIdAndUpdate(main_info_id ,{...body} , {new : true});
  res.status(200).send({message : "Main Info Saved" , success : true});
});

const getMainInfo = asyncHandler(async(req , res) => {
  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "administration",
        populate : {
            path : "main_info"
        }
      }
    }
  });
  let main_info_id = user.projects[0].insights.administration.main_info._id;
  main_info_id = main_info_id.toString();
  const main_info = await AMainInfo.findById(main_info_id);
  return res.status(200).send({message : "Fetched Main Info" , success : true , main_info})
});

const addAddress = asyncHandler(async (req, res) => {
  const { address_info, country, state, city, postal_code, location } =
    req.body;
  const { body } = req;

  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "administration",
        populate: {
          path: "address",
        },
      },
    },
  });

  let address_id = user.projects[0].insights.administration.address._id;
  address_id = address_id.toString();
  const address = await Address.findByIdAndUpdate(
    address_id,
    { ...body },
    { new: true }
  );
  res.status(200).send({ message: "Address Saved", success: true });
});

const getAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "administration",
        populate: {
          path: "address",
        },
      },
    },
  });
  let address_id = user.projects[0].insights.administration.address._id;
  address_id = address_id.toString();
  const address = await Address.findById(address_id);
  return res
    .status(200)
    .send({ message: "Fetched Address", success: true, address });
});

const addContact = asyncHandler(async (req, res) => {
  const { name, email, contact_number, mobile_number, effective_from } =
    req.body;
  const { body } = req;

  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "administration",
        populate: {
          path: "contact",
        },
      },
    },
  });
  let contact_id = user.projects[0].insights.administration.contact._id;
  contact_id = contact_id.toString();
  const contact = await Contact.findByIdAndUpdate(
    contact_id,
    { ...body },
    { new: true }
  );
  res.status(200).send({ message: "Contact Saved", success: true });
});

const getContact = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "administration",
        populate: {
          path: "contact",
        },
      },
    },
  });
  let contact_id = user.projects[0].insights.administration.contact._id;
  contact_id = contact_id.toString();
  const contact = await Contact.findById(contact_id);
  return res
    .status(200)
    .send({ message: "Fetched Contact", success: true, contact });
});

const addExtraInfo = asyncHandler(async (req, res) => {
  const {
    company_status,
    cst_no,
    pan_no,
    registration_no,
    gst_in,
    gst_type,
    gstin_reg_date,
    gstin_effective_date,
    rera_registration_no,
  } = req.body;
  const { body } = req;

  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "administration",
        populate: {
          path: "extra_info",
        },
      },
    },
  });
  let extra_info_id = user.projects[0].insights.administration.extra_info._id;
  extra_info_id = extra_info_id.toString();
  const extra_info = await ExtraInfo.findByIdAndUpdate(
    extra_info_id,
    { ...body },
    { new: true }
  );
  res.status(200).send({ message: "Extra Info Saved", success: true });
});

const getExtraInfo = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "administration",
        populate: {
          path: "extra_info",
        },
      },
    },
  });
  let extra_info_id = user.projects[0].insights.administration.extra_info._id;
  extra_info_id = extra_info_id.toString();
  const extra_info = await ExtraInfo.findById(extra_info_id);
  return res
    .status(200)
    .send({ message: "Fetched Extra Info", success: true, extra_info });
});




const addAttachment = asyncHandler(async (req, res) => {
  const imageUrl = req.imageUrl; 
  const { qr_code } = req.body;

  const user = await User.findById(req.user._id).populate({
      path: "projects",
      match: { _id: req.params.id },
      populate: {
          path: "insights",
          populate: {
              path: "administration",
              populate: {
                  path: "attachment",
              },
          },
      },
  });


  let attachmentId = user.projects[0].insights.administration.attachment._id;
  attachmentId=attachmentId.toString();
  const attachmentSave=await Attachment.findByIdAndUpdate(attachmentId,{logo:imageUrl,qr_code},{new:true})
  
 await attachmentSave.save();
  res.status(200).send({ message: "Attachment Info Saved", success: true});
});

const getAttachment = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
      path: "projects",
      match: { _id: req.params.id },
      populate: {
          path: "insights",
          populate: {
              path: "administration",
              populate: {
                  path: "attachment",
              },
          },
      },
  });

  if (!user || !user.projects.length) {
      return res.status(404).send({ message: "User or project not found", success: false });
  }

  const attachments = user.projects[0].insights.administration.attachments;
  if (attachments && attachments.length > 0) {
      const attachment_id = attachments[0]._id.toString();
      const attachment = await Attachment.findById(attachment_id);

      if (!attachment) {
          return res.status(404).send({ message: "Attachment not found", success: false });
      }

      return res.status(200).send({
          message: "Fetched Attachment Info",
          success: true,
          attachment,
      });
  } else {
      return res.status(404).send({ message: "No attachments found", success: false });
  }
});


export {
  addMainInfo,
  getMainInfo,
  addAddress,
  getAddress,
  addContact,
  getContact,
  addExtraInfo,
  getExtraInfo,
  addAttachment,
  getAttachment
};
