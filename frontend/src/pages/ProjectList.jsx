import React, { useState, useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import { toast } from "sonner";
import { apiVerify } from "@/schema/apiSchema";
import useAuth from "@/context/authContext";
import { FaCog } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addProject } from "@/schema/addProjectSchema";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";

const ProjectList = () => {
  const { isAuthenticated } = useAuth();
  const [isAddProjectDialogVisible, setIsAddProjectDialogVisible] =
    useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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

        setProjects(res.data.projects || []);
        toast.success("Projects loaded successfully");
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

    if (isAuthenticated) {
      fetchProjects();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const toggleDialog = () => {
    setIsAddProjectDialogVisible(!isAddProjectDialogVisible);
  };

  const addProjectToList = (newProject) => {
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const updateProject = (projectId, updates) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === projectId ? { ...project, ...updates } : project
      )
    );
  };

  const deleteProject = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project._id !== projectId)
    );
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        Access Blocked
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Projects</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project._id}
              {...project}
              onProjectUpdate={updateProject}
              onProjectDelete={deleteProject}
            />
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center min-h-[200px] text-gray-500">
            No projects found.
          </div>
        )}
      </div>
      <button
        className="fixed bottom-8 right-8 bg-primary text-white rounded-full p-4 shadow-lg hover:bg-primary/90 transition-colors"
        onClick={toggleDialog}
      >
        <IoIosAddCircle className="w-8 h-8" />
      </button>
      <AddProjectDialog
        isOpen={isAddProjectDialogVisible}
        onClose={toggleDialog}
        addProjectToList={addProjectToList}
      />
    </div>
  );
};

const ProjectCard = ({
  _id: projectId,
  name,
  location,
  displayImage,
  published,
  onProjectUpdate,
  onProjectDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [email, setEmail] = useState("");
  const [Otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const toggleEditing = (e) => {
    e.stopPropagation();
    setIsEditing((prev) => !prev);
  };

  const openDialog = (action) => {
    setActionType(action);
    setDialogOpen(true);
  };

  const handleDialogAction = async (confirm) => {
    setDialogOpen(false);

    if (confirm) {
      try {
        if (actionType === "delete") {
          await handleDelete();
        } else if (actionType === "publish" || actionType === "unpublish") {
          await handlePublishToggle();
        }
      } catch (error) {
        console.error("Error during action:", error);
        toast.error("An error occurred. Please try again.");
      }
    }

    setIsEditing(false);
    setEmail("");
    setPassword("");
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/projects/deleteProject/${projectId}`,
        { data: { email, password } }
      );
      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }
      toast.success(res.data.message);
      onProjectDelete(projectId);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handlePublishToggle = async () => {
    try {
      const endpoint = published
        ? `${import.meta.env.VITE_API_URL}/projects/unPublish/${projectId}`
        : `${import.meta.env.VITE_API_URL}/projects/publish/${projectId}`;

      const res = await axios.get(endpoint);
      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }
      toast.success(res.data.message);
      onProjectUpdate(projectId, { published: !published });
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error) => {
    const { response } = error;
    if (!response) {
      toast.error("Database connection error");
    } else if (!apiVerify(response)) {
      toast.warning("API Error, Please contact admin");
    } else {
      toast.error(response.data.message);
    }
  };

  const handleCardClick = () => {
    if (!isEditing) {
      navigate(`/dashboard/${projectId}`);
    }
  };

  return (
    <div
      className="relative w-[300px] h-[200px] m-5 rounded-lg shadow-2xl hover:scale-105 transition-transform cursor-pointer "
      onClick={handleCardClick}
    >
      <div className="absolute bg-white size-5 rounded-full top-2 right-2 z-10 flex items-center justify-center">
        <FaCog
          className={`cursor-pointer text-black  ${
            isEditing ? "text-primary" : ""
          }`}
          onClick={toggleEditing}
        />
      </div>

      {isEditing ? (
        <div className="flex items-center justify-center w-full h-full bg-background/80 backdrop-blur-sm rounded-lg">
          <div className="flex flex-col space-y-2">
            <Button
              variant={published ? "destructive" : "default"}
              onClick={() => openDialog(published ? "unpublish" : "publish")}
            >
              {published ? "Unpublish" : "Publish"}
            </Button>
            <Button variant="destructive" onClick={() => openDialog("delete")}>
              Delete
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={displayImage || "/placeholder.jpg"}
            alt="Project site"
          />
          <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
            <h3 className="font-bold text-lg truncate">{name}</h3>
            <p className="text-sm truncate">{location}</p>
          </div>
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === "delete"
                ? "Confirm Delete"
                : actionType === "publish"
                ? "Publish Project"
                : "Unpublish Project"}
            </DialogTitle>
          </DialogHeader>
          {actionType === "delete" && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="OTP" className="text-right">
                  OTP
                </Label>
                <Input
                  id="OTP"
                  type="text"
                  value={Otp}
                  onChange={(event) => {
                    const value = event.target.value;
                    if (/^\d{0,6}$/.test(value)) {
                      setOtp(value);
                    }
                  }}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => handleDialogAction(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleDialogAction(true)}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const AddProjectDialog = ({ isOpen, onClose, addProjectToList }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({});
  const [loading, setLoading] = useState(false);
  const[prompt, setPrompt] = useState("");

  const generateImage = async ()=> {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/projects/generateImage `,
        {prompt:prompt}
      );

      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }
      toast.success(res.data.message);

      reset();
      onClose();
      window.location.reload();
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
  } 

  const onSubmit = async (data) => {
    const projectData = new FormData();
    projectData.append("name", data.name);
    projectData.append("location", data.location);
    projectData.append("uploadfile", data.uploadfile[0]);

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

      addProjectToList(res.data.project);
      reset();
      onClose();
      window.location.reload();
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
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Name of your project"
                className="col-span-3"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 col-start-2 col-span-3">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                placeholder="Location of your project"
                className="col-span-3"
                {...register("location")}
              />
              {errors.location && (
                <p className="text-red-500 col-start-2 col-span-3">
                  {errors.location.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="uploadfile" className="text-right">
                Image
              </Label>
              <Input
                id="uploadfile"
                type="file"
                className="col-span-3"
                {...register("uploadfile")}
              />
              {errors.uploadfile && (
                <p className="text-red-500 col-start-2 col-span-3">
                  {errors.uploadfile.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="generateImage" className="text-right">
              Generate Image with DALL-E
              </Label>
              <Input
                id="generateImage"
                placeholder="Enter details to generate project display image"
                className="col-span-3"
                onChange={(e)=>{setPrompt(e.target.value)}}
              />
            </div>
          </div>
          <DialogFooter>
          <Button onClick={() => generateImage()} disabled={loading}>
              {loading ? "Generating..." : "Generate Image"}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectList;
