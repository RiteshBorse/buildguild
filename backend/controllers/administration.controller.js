import { User } from "../models/User/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { MainInfo } from "../models/Administration/info.model.js";
import { Address } from "../models/Administration/address.model.js";
import { Contact } from "../models/Administration/contact.model.js";


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
  const main_info = await MainInfo.findByIdAndUpdate(main_info_id ,{...body} , {new : true});
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
  const main_info = await MainInfo.findById(main_info_id);
  return res.status(200).send({message : "Fetched Main Info" , success : true , main_info})
});

const addAddress = asyncHandler(async(req,res)=>{
  const{
    address_info,
    country,
    state,
    city,
    postal_code,
    location,
  }=req.body;
  const{body}=req;

  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "administration",
        populate : {
            path : "address"
        }
      }
    }
  });

  let address_id = user.projects[0].insights.administration.address._id;
  address_id = address_id.toString();
  const address = await Address.findByIdAndUpdate(address_id ,{...body} , {new : true});
  res.status(200).send({message : "Address Saved" , success : true});
});

const getAddress = asyncHandler(async(req , res) => {
  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "administration",
        populate : {
            path : "address"        }
      }
    }
  });
  let address_id = user.projects[0].insights.administration.address._id;
  address_id = address_id.toString();
  const address = await MainInfo.findById(address_id);
  return res.status(200).send({message : "Fetched Address" , success : true , address})
});

const addContact = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    contact_number,
    mobile_number,
    effective_from,
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
            path : "contact"
        }
      }
    }
  });
  let contact_id = user.projects[0].insights.administration.contact._id;
  contact_id = contact_id.toString();
  const contact = await Contact.findByIdAndUpdate(contact_id ,{...body} , {new : true});
  res.status(200).send({message : "Contact Saved" , success : true});
});

const getContact = asyncHandler(async(req , res) => {
  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "administration",
        populate : {
            path : "contact"
        }
      }
    }
  });
  let contact_id = user.projects[0].insights.administration.contact._id;
  contact_id = contact_id.toString();
  const contact = await Contact.findById(contact_id);
  return res.status(200).send({message : "Fetched Contact" , success : true , contact})
});

export { addMainInfo , getMainInfo ,addAddress, getAddress , addContact, getContact};
