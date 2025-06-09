import React, { useState, useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { apiVerify } from "@/schema/apiSchema";
import useAuth from "@/context/authContext";
import { FaCog, FaRegEdit, FaRegTrashAlt } from "react-icons/fa";
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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

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
      <div className="flex items-center justify-center w-full h-screen bg-background">
        <Card className="w-[400px] p-8 text-center">
          <h2 className="text-2xl font-bold text-destructive mb-2">Access Denied</h2>
          <p className="text-muted-foreground">Please log in to view your projects.</p>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto mt-14 px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
            <p className="text-muted-foreground mt-1">Manage and track your construction projects</p>
          </div>
          <Button 
            onClick={toggleDialog}
            className="gap-2"
            size="lg"
          >
            <IoIosAddCircle className="w-5 h-5" />
            New Project
          </Button>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {projects.length > 0 ? (
              projects.map((project) => (
                <motion.div
                  key={project._id}
                  variants={itemVariants}
                  layout
                >
                  <ProjectCard
                    {...project}
                    onProjectUpdate={updateProject}
                    onProjectDelete={deleteProject}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div 
                variants={itemVariants}
                className="col-span-full"
              >
                <Card className="p-8 text-center">
                  <div className="flex flex-col items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                      <IoIosAddCircle className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">No projects yet</h3>
                      <p className="text-muted-foreground mt-1">
                        Create your first project to get started
                      </p>
                    </div>
                    <Button onClick={toggleDialog} className="mt-2">
                      Create Project
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AddProjectDialog
          isOpen={isAddProjectDialogVisible}
          onClose={toggleDialog}
          addProjectToList={addProjectToList}
        />
      </div>
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
  const [otp, setOtp] = useState("");
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
    setOtp("");
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/projects/deleteProject/${projectId}`,
        { data: { email, otp } }
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
    <>
      <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="absolute top-3 right-3 z-10">
          <Button
            variant="ghost"
            size="icon"
            className={`rounded-full bg-background/80 backdrop-blur-sm transition-colors ${
              isEditing ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={toggleEditing}
          >
            <FaCog className="h-4 w-4" />
          </Button>
        </div>

        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/95 backdrop-blur-sm z-20 flex items-center justify-center"
            >
              <div className="flex flex-col gap-3 p-4">
                <Button
                  variant={published ? "destructive" : "default"}
                  onClick={() => openDialog(published ? "unpublish" : "publish")}
                  className="gap-2"
                >
                  {published ? (
                    <>
                      <FaRegEdit className="h-4 w-4" />
                      Unpublish
                    </>
                  ) : (
                    <>
                      <FaRegEdit className="h-4 w-4" />
                      Publish
                    </>
                  )}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => openDialog("delete")}
                  className="gap-2"
                >
                  <FaRegTrashAlt className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className="relative aspect-[4/3] cursor-pointer overflow-hidden"
          onClick={handleCardClick}
        >
          <img
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            src={displayImage || "/placeholder.jpg"}
            alt={name}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white text-lg truncate">{name}</h3>
                <p className="text-white/80 text-sm truncate">{location}</p>
              </div>
              <Badge variant={published ? "default" : "secondary"}>
                {published ? "Published" : "Draft"}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
          {actionType === "delete" ? (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="col-span-3"
                  placeholder="Enter your email"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="otp" className="text-right">
                  OTP
                </Label>
                <Input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    const value = e.target.value;
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
          ) : (
            <p className="text-muted-foreground">
              Are you sure you want to {actionType === "publish" ? "publish" : "unpublish"} this project?
              {actionType === "publish" 
                ? " This will make the project visible to all users."
                : " This will hide the project from public view."}
            </p>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => handleDialogAction(false)}>
              Cancel
            </Button>
            <Button 
              variant={actionType === "delete" ? "destructive" : "default"}
              onClick={() => handleDialogAction(true)}
            >
              {actionType === "delete" 
                ? "Delete Project"
                : actionType === "publish"
                ? "Publish"
                : "Unpublish"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
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
          </div>
          <DialogFooter>
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
