import mongoose from "mongoose";
const projectinsightSchema = new mongoose.Schema({
  adminstration: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Administration",
  },
  engineering: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Engineering",
  },
  material: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Material",
  },
  financials:  {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Financial"
},
});

export const ProjectInsight = mongoose.model(
  "ProjectInsight",
  projectinsightSchema
);
