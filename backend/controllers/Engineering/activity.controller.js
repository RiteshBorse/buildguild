import { Activity } from "../../models/Engineering/Activity/activity.model.js";
import { EChangeHistory } from "../../models/Engineering/changeHistory.model.js";
import { Engineering } from "../../models/Engineering/engineering.model.js";
import { User } from "../../models/User/user.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const addActivity = asyncHandler(async (req, res) => {
  const { code, description, long_desc, uom, belongs_to, equip_activity } =
    req.body;

  const { body } = req;
  const user = await User.findById(req.user._id).populate({
    path: "projects",
    match: { _id: req.params.id },
    populate: {
      path: "insights",
      populate: {
        path: "engineering",
      },
    },
  });

  let engineering_id = user.projects[0].insights.engineering._id;
  const activity = await Activity.create({
    ...body,
  });
  await activity.save();
  engineering_id = engineering_id.toString();
  const engineering = await Engineering.findById(engineering_id);
  engineering.activity.push(activity);
  await engineering.save();

  const change_history = await EChangeHistory.create({
    changed_by: req.user.username,
    changed_section: "Activity",
  });
  await change_history.save();
  engineering.change_history.push(change_history);
  await engineering.save();
  res.status(200).send({ message: "Activity Saved", success: true, activity });
});


const getActivity = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate({
      path: "projects",
      match: { _id: req.params.id },
      populate: {
        path: "insights",
        populate: {
          path: "engineering",
          populate: {
            path: "activity"
          }
        }
      }
    });
  
    if (!user.projects[0]) {
      return res.status(404).send({ message: "Project not found", success: false });
    }
  
    const activities = user.projects[0].insights.engineering.activity;
  
    if (!activities || activities.length === 0) {
      return res.status(404).send({ message: "No activities found", success: false });
    }
  
    res.status(200).send({ message: "Fetched Activities", success: true, activities });
});
  
export { addActivity , getActivity};
