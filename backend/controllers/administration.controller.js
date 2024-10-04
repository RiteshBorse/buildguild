import { User } from "../models/User/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { MainInfo } from "../models/Administration/info.model.js";


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
})

export { addMainInfo , getMainInfo  };
