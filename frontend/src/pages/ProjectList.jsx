import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircle } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addProject } from "@/schema/addProjectSchema";
import axios from "axios";
import { toast } from "sonner";
import { apiVerify } from "@/schema/apiSchema";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import buildingImage from "@/images/mansion.webp"; 

const ProjectCard = ({ name, location, displayImage }) => {
  return (
    <div className="flex sm:flex-col w-[70%] sm:h-56 sm:w-[20%] h-[20%] mt-5 sm:m-5 rounded-lg shadow-lg hover:scale-105 transition-transform hover:cursor-pointer">
      <img
        className="w-[75%] sm:w-full h-[100%] sm:h-[60%] overflow-hidden border-r-2 sm:border-b-2 sm:border-r-0 border-black rounded-l-lg sm:rounded-t-lg sm:rounded-b-none"
        src={displayImage || buildingImage} // Placeholder if no image is provided
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

const AddProjectDialog = ({ isOpen, onClose, addProjectToList }) => {
  const { register, handleSubmit, reset } = useForm();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log("Form data submitted:", data); // Debug form data

    const { name, location, displayImage } = data;
  //  const { name, location, displayImage } = data;
    // if (!displayImage || displayImage.length === 0) {
    //   setErrors({ image: ["Please upload an image"] });
    //   console.log("Image is missing");
    //   return;
    // }
    //const file = displayImage[0]; // Extract the first file from the FileList

    const projectData = {
      name,
      location: location.toString(),
      // displayimage: file,
      displayImage: buildingImage, // Placeholder image string
    };

    const result = addProject.safeParse(projectData);
    if (!result.success) {
      console.log("Validation errors:", result.error.formErrors.fieldErrors); // Debug validation errors
      setErrors(result.error.formErrors.fieldErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/projects/createProject`,
        data
      );
      console.log("API response:", res); // Debug API response
      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }
      toast.success(res.data.message);
      console.log("Project added successfully:", data); // Debug project data after successful addition
      addProjectToList(data); // Add the new project to the list
      reset();
      onClose(); // Close the dialog after successful submission
    } catch (error) {
      const { response } = error;
      console.error("API error:", error); // Debug API error
      if (!response) {
        toast.error("Database connection error");
        return;
      }
      if (!apiVerify(response)) {
        toast.warning("API Error, Please contact admin");
        return;
      }
      toast.error(response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name of your project"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name[0]}</span>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Location of your project"
                {...register("location", { required: true })}
              />
              {errors.location && (
                <span className="text-red-500">{errors.location[0]}</span>
              )}
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="image">Upload Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                {...register("image", { required: true })}
              />
            </div>

            <Button type="submit" className="mt-4" disabled={loading}>
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const ProjectList = () => {
  const [isAddProjectDialogVisible, setIsAddProjectDialogVisible] =
    useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/projects/myProjects`);
        console.log("API response for projects:", res); // Debug API response
        
        if (!apiVerify(res)) {
          toast.warning("API Error, Please contact admin");
          return;
        }

        setProjects(res.data.projects || []); // Assuming projects are returned in `res.data.projects`
        toast.success("Projects loaded successfully");
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const toggleDialog = () => {
    setIsAddProjectDialogVisible(!isAddProjectDialogVisible);
  };

  const addProjectToList = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  if (loading) {
    return <div>Loading projects...</div>; // Show loading state
  }

  if (error) {
    return <div>{error}</div>; // Show error state
  }

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap items-center w-full h-min mt-[70px]">
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))
      ) : (
        <div>No projects found.</div> // Handle case when no projects are available
      )}

      <IoIosAddCircle
        className="text-7xl fixed bottom-10 right-10 hover:cursor-pointer hover:scale-110 hover:animate-pulse"
        onClick={toggleDialog}
      />

      <AddProjectDialog
        isOpen={isAddProjectDialogVisible}
        onClose={toggleDialog}
        addProjectToList={addProjectToList}
      />
    </div>
  );
};

export default ProjectList;
