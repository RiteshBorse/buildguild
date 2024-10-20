import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiVerify } from "@/schema/apiSchema";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoIosAddCircle } from "react-icons/io";
import { formatDate } from "@/utils/formatdate.js";

const Activity = ({ id }) => {
  const [activities, setActivities] = useState([]);
  const [isAddActivityDialogVisible, setIsAddActivityDialogVisible] =
    useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/engineering/activity/${id}`
        );

        if (!apiVerify(res)) {
          toast.warning("API Error, Please contact admin");
          return;
        }

        setActivities(res.data.activities);
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
      }
    };

    fetchData();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/engineering/activity/${id}`,
        data
      );

      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }

      setActivities((prev) => [...prev, res.data.activity]);
      toast.success("Activity Added Successfully");
      setIsAddActivityDialogVisible(false);
    } catch (error) {
      console.error("Submission Error:", error);
      const { response } = error;
      if (!response) {
        toast.error("Database connection error");
        return;
      }
      toast.error(response.data.message);
    }
  };

  const deleteActivity = async (id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/engineering/activity`, 
        { id }
      );

      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }

      setActivities((prev) => prev.filter((activity) => activity._id !== id)); 
      toast.success("Activity Deleted");
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
    }
  };

  return (
    <div>
      <Table>
        <TableHeader className="bg-black">
          <TableRow>
            <TableHead className="text-white">Code</TableHead>
            <TableHead className="text-white">Description</TableHead>
            <TableHead className="text-white">Long Description</TableHead>
            <TableHead className="text-white">UOM</TableHead>
            <TableHead className="text-white">Belongs To</TableHead>
            <TableHead className="text-white">Equip Activity</TableHead>
            <TableHead className="text-white">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities && activities.length > 0 ? (
            activities.map((activity) => (
              <TableRow key={activity._id}>
                <TableCell>{activity.code}</TableCell>
                <TableCell>{activity.description}</TableCell>
                <TableCell>{activity.long_desc}</TableCell>
                <TableCell>{activity.uom}</TableCell>
                <TableCell>{activity.belongs_to}</TableCell>
                <TableCell>{activity.equip_activity}</TableCell>
                <TableCell>
                  <Button
                    className="bg-red-500 hover:bg-red-700"
                    onClick={() => {
                      deleteActivity(activity._id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No activities available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <IoIosAddCircle
        className="text-7xl fixed bottom-10 right-10 hover:cursor-pointer hover:scale-110 hover:animate-pulse"
        onClick={() => setIsAddActivityDialogVisible(true)}
      />

      <Dialog
        open={isAddActivityDialogVisible}
        onOpenChange={setIsAddActivityDialogVisible}
      >
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Activity</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                {...register("code", { required: "Code is required" })}
                placeholder="Enter Code"
              />
              {errors.code && (
                <span className="text-red-500 block mt-1">
                  {errors.code.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Enter Description"
              />
              {errors.description && (
                <span className="text-red-500 block mt-1">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="long_desc">Long Description</Label>
              <Input
                id="long_desc"
                {...register("long_desc", {
                  required: "Long description is required",
                })}
                placeholder="Enter Long Description"
              />
              {errors.long_desc && (
                <span className="text-red-500 block mt-1">
                  {errors.long_desc.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="uom">UOM</Label>
              <Input
                id="uom"
                {...register("uom", { required: "UOM is required" })}
                placeholder="Enter Unit of Measure"
              />
              {errors.uom && (
                <span className="text-red-500 block mt-1">
                  {errors.uom.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="belongs_to">Belongs To</Label>
              <Input
                id="belongs_to"
                {...register("belongs_to", {
                  required: "Belongs To is required",
                })}
                placeholder="Enter Belongs To"
              />
              {errors.belongs_to && (
                <span className="text-red-500 block mt-1">
                  {errors.belongs_to.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="equip_activity">Equip Activity</Label>
              <Input
                id="equip_activity"
                {...register("equip_activity", {
                  required: "Equip Activity is required",
                })}
                placeholder="Enter Equip Activity"
              />
              {errors.equip_activity && (
                <span className="text-red-500 block mt-1">
                  {errors.equip_activity.message}
                </span>
              )}
            </div>

            <DialogFooter>
              <Button type="submit">Add</Button>
              <Button
                variant="outline"
                onClick={() => setIsAddActivityDialogVisible(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Activity;
