import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircle } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addProject } from "@/schema/addProjectSchema";
import Image from "@/images/mansion.webp";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";

const ProjectCard = ({ name, location, imageUrl }) => {
  return (
    <div className="flex sm:flex-col w-[70%] sm:h-56 sm:w-[20%] h-[20%] mt-5 sm:m-5 rounded-lg shadow-lg hover:scale-105 transition-transform hover:cursor-pointer">

      <img
        className="w-[75%] sm:w-full h-[100%] sm:h-[60%] overflow-hidden border-r-2 sm:border-b-2 sm:border-r-0 border-black rounded-l-lg sm:rounded-t-lg sm:rounded-b-none"
        src={imageUrl || Image}
        alt="Project site"
      />
      <div className="flex flex-col w-full sm:h-[40%] px-4 justify-center rounded-r-lg sm:rounded-b-lg overflow-x-auto overflow-y-hidden bg-white">
        <div className="flex m-1">
          <h3 className="font-bold text-lg sm:text-base">Name:</h3>
          <h4 className="text-lg sm:text-base">&nbsp;{name}</h4>
        </div>
        <div className="flex m-1">
          <h3 className="font-bold text-lg sm:text-base">Location:</h3>
          <h4 className="text-lg sm:text-base">&nbsp;{location}</h4>
        </div>
      </div>
    </div>
  );
};

const AddProjectForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [validationErrors, setValidationErrors] = useState({});
  const onSubmitProject = (data) => {
    const newProject = {
      ...data,
      imageUrl: data.image ? URL.createObjectURL(data.image) : Image,
    };
    const result = addProject.safeParse(data);
    if (!result.success) {
      const fieldError = result.error.formErrors.fieldErrors;
      setValidationErrors(fieldError);
      return;
    }
    setValidationErrors({});
    onSubmit(newProject);
    setValue("name", "");
    setValue("location", "");
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setValue("image", e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitProject)}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Name of your project"
            {...register("name")}
          />
          {validationErrors.name && (
            <span className="text-red-500">{validationErrors.name[0]}</span>
          )}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Location of your project"
            {...register("location")}
          />
          {validationErrors.location && (
            <span className="text-red-500">{validationErrors.location[0]}</span>
          )}
        </div>

        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="image">Upload Image</Label>
          <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <Button type="submit" className="mt-4">
          Create Project
        </Button>
      </div>
    </form>
  );
};

const AddProjectDialog = ({ isOpen, onClose, onSubmit }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <AddProjectForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

const ProjectList = () => {
  const [isAddProjectDialogVisible, setIsAddProjectDialogVisible] = useState(false);
  const [cards, setCards] = useState([
    { name: "Siddhi Niwas", location: "Amrutdham,Nashik", imageUrl: Image },
  ]);

  const handleAddProjectClick = () => {
    setIsAddProjectDialogVisible(true);
  };

  const handleCloseDialog = () => {
    setIsAddProjectDialogVisible(false);
  };

  const handleAddProject = (newProject) => {
    console.log(newProject);
    handleCloseDialog();
  };

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap items-center sm:items-center w-full h-min mt-[70px]">
      {cards.map((card, index) => (
        <ProjectCard key={index} {...card} />
      ))}

      <IoIosAddCircle
        className="text-7xl fixed bottom-10 right-10 hover:cursor-pointer hover:scale-110 hover:animate-pulse"
        onClick={handleAddProjectClick}
      />

      <AddProjectDialog
        isOpen={isAddProjectDialogVisible}
        onClose={handleCloseDialog}
        onSubmit={handleAddProject}
      />
    </div>
  );
};

export default ProjectList;
