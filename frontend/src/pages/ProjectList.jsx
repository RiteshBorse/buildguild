import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoIosAddCircle } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addProject } from "@/schema/addProjectSchema";
import axios from "axios";
import { toast } from "sonner";
import { apiVerify } from "@/schema/apiSchema.js";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import buildingImage from "@/images/mansion.webp";
import { FaEye, FaEyeSlash, FaCog } from "react-icons/fa";
import useAuth from "@/context/authContext";
import { Link, Navigate, useNavigate } from "react-router-dom";

const ProjectCard = ({ _id: projectId, name, location, displayImage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [published, setPublished] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // For toggling password visibility

  const { user } = useAuth();
  const navigate = useNavigate(); // Use navigate for routing

  const toggleEditing = (event) => {
    event.stopPropagation(); // Prevent the card's click from triggering
    console.log("Toggling edit mode");
    setIsEditing((prev) => !prev);
  };

  const openDialog = (action) => {
    console.log(`Opening dialog for action: ${action}`);
    setActionType(action);
    setDialogOpen(true);
  };

  const handleDialogAction = async (confirm) => {
    console.log(`Dialog confirmed: ${confirm}`);
    setDialogOpen(false);

    if (confirm) {
      if (actionType === "delete") {
        console.log(`Attempting to delete project with ID: ${projectId}`);
        if (email === user?.email && password === user?.password) {
          try {
            const res = await axios.delete(
              `${import.meta.env.VITE_API_URL}/projects/deleteProject/${projectId}`
            );
            if (!apiVerify(res)) {
              toast.warning("API Error, Please contact admin");
              return;
            }
            toast.success(res.data.message);
          } catch (error) {
            const { response } = error;
            console.log("Error during deletion:", error);
            if (!response) {
              toast.error("Database connection error");
              return;
            }
            if (!apiVerify(response)) {
              toast.warning("API Error, Please contact admin");
              return;
            }
            toast.error(response.data.message);
          }
        } else {
          toast.error("Credentials do not match");
        }
      } else if (actionType === "publish") {
        console.log("Publishing project");
        setPublished(true); // Mark project as published
      } else if (actionType === "unpublish") {
        console.log("Unpublishing project");
        setPublished(false); // Mark project as unpublished
      }
    }
    setIsEditing(false);
    setEmail("");
    setPassword("");
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
    console.log(`Password visibility: ${!isPasswordVisible}`);
  };

  const handleCardClick = (e) => {
    console.log(`Card clicked. isEditing: ${isEditing}`);
    if (isEditing) {
      e.stopPropagation(); // Prevent navigation if in editing mode
      return;
    }
    console.log(`Navigating to project details for ID: ${projectId}`);
    navigate(`/dashboard/${projectId}`);
  };

  return (
    <div
      className="relative sm:flex-col w-[300px] h-[200px] mt-5 sm:m-5 rounded-lg shadow-2xl hover:scale-105 transition-transform hover:cursor-pointer"
      onClick={handleCardClick} // Handle card click for navigation
    >
      {/* Settings Icon */}
      <div className="absolute top-2 right-2">
        <FaCog
          className={`cursor-pointer ${isEditing ? "text-black" : "text-black"}`}
          onClick={(e) => {
            console.log("Settings icon clicked");
            toggleEditing(e);
          }} // Ensure only this triggers when clicked
        />
      </div>

      {isEditing ? (
        <div className="flex items-center justify-center w-full h-full shadow-lg">
          <div className="flex space-x-4">
            <Button
              className={`py-2 px-4 text-white rounded-md shadow-lg ${
                published
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-slate-900 hover:bg-slate-700"
              }`}
              onClick={(e) => {
                e.stopPropagation(); // Prevent the card click
                console.log(published ? "Unpublishing project" : "Publishing project");
                openDialog(published ? "unpublish" : "publish");
              }}
            >
              {published ? "Unpublish" : "Publish"}
            </Button>

            <Button
              className="py-2 px-4 text-white bg-red-500 hover:bg-red-600 rounded-md shadow-lg"
              onClick={(e) => {
                e.stopPropagation(); // Prevent the card click
                console.log("Delete button clicked");
                openDialog("delete");
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <div className="w-full h-[60%] rounded-t-lg"> {/* image division */}
            <img
              className="w-full h-full object-cover"
              src={displayImage || buildingImage}
              alt="Project site"
            />
          </div>
          <div
            className="absolute bottom-0 w-full h-[40%] px-4 rounded-b-lg overflow-x-auto overflow-y-hidden"
            style={{ backdropFilter: "blur(5px)" }} // text division with transparency
          >
            <div className="flex m-1  whitespace-nowrap">
              <h3 className="font-bold text-lg">Name:</h3>
              <h4 className="text-lg">&nbsp;{name}</h4>
            </div>
            <div className="flex m-1 overflow-x-auto whitespace-nowrap">
              <h3 className="font-bold text-lg">Location:</h3>
              <h4 className="text-lg">&nbsp;{location}</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AddProjectDialog = ({ isOpen, onClose, addProjectToList }) => {
  const { register, handleSubmit, reset } = useForm();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    const projectData = {
      name: data.name,
      location: data.location,
      uploadfile: data.uploadfile[0],
    };
    const result = addProject.safeParse(projectData);
    if (!result.success) {
      setErrors(result.error.formErrors.fieldErrors);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/projects/createProject`,
        projectData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }
      toast.success(res.data.message);

      addProjectToList(data);
      reset();
      onClose(); // Close the dialog after successful submission
    } catch (error) {
      const { response } = error;

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
                name="uploadfile"
                type="file"
                {...register("uploadfile", { required: true })}
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
  const { isAuthenticated, user, useAuthLogin } = useAuth();
  if (!isAuthenticated) {
    return (
      <div className="flex items-center w-full h-screen justify-center">
        Access Blocked
      </div>
    );
  }

  const [isAddProjectDialogVisible, setIsAddProjectDialogVisible] =
    useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch projects from the backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/projects/myProjects`
        );

        if (!apiVerify(res)) {
          toast.warning("API Error, Please contact admin");
          return;
        }

        setProjects(res.data.projects || []); // Assuming projects are returned in `res.data.projects`
        toast.success("Projects loaded successfully");
      } catch (error) {
        const { response } = error;
        if (!response) {
          toast.error("Database connection error");
          return;
        }
        if (!apiVerify(response)) {
          toast.warning("Api Error , Please contact admin");
          return;
        }
        toast.error(response.data.message);
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
    <div className="flex flex-col sm:flex-row sm:flex-wrap items-center w-full h-min mt-[80px] ">
      {projects.length > 0 ? (
        projects.map((project) => (
          <Link to={`/dashboard/${project._id}`} key={project._id}>
            <ProjectCard {...project} />
          </Link>
        ))
      ) : (
        <div className="flex items-center justify-center min-w-full min-h-96">
          No projects found.
        </div> // no projects available
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
