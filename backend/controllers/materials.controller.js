// import { User } from "../models/User/user.model.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { MMainInfo } from "../models/Materials/info.model.js";

// const addMainInfo = asyncHandler(async (req, res) => {
//   const {
//     business_unit,
//     financial_year,
//     document_type,
//     document_date,
//     document_no,
//     supplier,
//     parent_account,
//     quotation_no,
//     quotation_date,
//     party_ref_no,
//     rate_basis,
//     credit_period,
//     days_from,
//     approval_note,
//     remark,
//   } = req.body;
//   const { body } = req;

//   const user = await User.findById(req.user._id).populate({
//     path: "projects",
//     match: { _id: req.params.id },
//     populate: {
//       path: "insights",
//       populate: {
//         path: "materials",
//         populate: {
//           path: "main_info",
//         },
//       },
//     },
//   });
//   let main_info_id = user.projects[0].insights.materials.main_info._id;
//   main_info_id = main_info_id.toString();
//   const main_info = await MainInfo.findByIdAndUpdate(
//     main_info_id,
//     { ...body },
//     { new: true }
//   );
//   res.status(200).send({ message: "Main Info Saved", success: true });
// });

// const getMainInfo = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id).populate({
//     path: "projects",
//     match: { _id: req.params.id },
//     populate: {
//       path: "insights",
//       populate: {
//         path: "materials",
//         populate: {
//           path: "main_info",
//         },
//       },
//     },
//   });
//   let main_info_id = user.projects[0].insights.materials.main_info._id;
//   main_info_id = main_info_id.toString();
//   const main_info = await MainInfo.findById(main_info_id);
//   return res
//     .status(200)
//     .send({ message: "Fetched Main Info", success: true, main_info });
// });
