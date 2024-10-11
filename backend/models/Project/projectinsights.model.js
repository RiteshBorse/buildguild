import mongoose from "mongoose";
const projectinsightSchema = new mongoose.Schema({
  administration: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Administration",
  },
  engineering: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Engineering",
  },
  materials: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Materials",
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
