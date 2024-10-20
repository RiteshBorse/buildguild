import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { IoIosAddCircle } from "react-icons/io";
import { apiVerify } from "@/schema/apiSchema";
import { useNavigate } from "react-router-dom";

const DPRAttachments = ({ id }) => {
  const [attachments, setAttachments] = useState([]);
  const [isAddAttachmentDialogVisible, setIsAddAttachmentDialogVisible] =
    useState(false);
  const navigate = useNavigate();
  const [loading , setloading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/engineering/dpr/attachment/${id}`
        );

        if (!apiVerify(res)) {
          toast.warning("API Error, Please contact admin");
          return;
        }

        setAttachments(res.data.attachment);
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

  // Handle form submission
  const onSubmit = async (data) => {
    const attachmentData = {
      ...data,
      uploadfile: data.uploadfile[0],
    };
    setloading(true)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/engineering/dpr/attachment/${id}`,
        attachmentData,
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

      setAttachments((prev) => [...prev, res.data.attachment]);
      setloading(false)
       // Update the state with the new attachment
      toast.success("Attachment Added Successfully");
      setIsAddAttachmentDialogVisible(false);
    } catch (error) {
      console.error("Submission Error:", error); // Log the error
      const { response } = error;
      if (!response) {
        toast.error("Database connection error");
        return;
      }
      toast.error(response.data.message);
    }
  };

  const deleteAttachment = async (id) => {
    console.log(id);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/engineering/dpr/attachment`,
        { id }
      );
      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }
      setAttachments((prev) =>
        prev.filter((attachment) => attachment._id !== id)
      );
      toast.success("Attachment Deleted");
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
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Category</TableHead>
            <TableHead className="text-white">Uploaded On</TableHead>
            <TableHead className="text-white">Remark</TableHead>
            <TableHead className="text-white">Document Date</TableHead>
            <TableHead className="text-white">Document No</TableHead>
            <TableHead className="text-white">View File</TableHead>
            <TableHead className="text-white">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attachments && attachments.length > 0 ? (
            attachments.map((attachment) => (
              <TableRow key={attachment._id}>
                <TableCell>{attachment.name}</TableCell>
                <TableCell>{attachment.category}</TableCell>
                <TableCell>{formatDate(attachment.uploaded_on)}</TableCell>
                <TableCell>{attachment.remark}</TableCell>
                <TableCell>{formatDate(attachment.document_date)}</TableCell>
                <TableCell>{attachment.document_no}</TableCell>
                <TableCell>
                  <Button
                    onClick={() =>
                      window.open(attachment.displayFile, "_blank")
                    }
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell>
                  {" "}
                  <Button
                    className="bg-red-500 hover:bg-red-700"
                    onClick={() => {
                      deleteAttachment(attachment._id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No attachments available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <IoIosAddCircle
        className="text-7xl fixed bottom-10 right-10 hover:cursor-pointer hover:scale-110 hover:animate-pulse"
        onClick={() => setIsAddAttachmentDialogVisible(true)}
      />

      <Dialog
        open={isAddAttachmentDialogVisible}
        onOpenChange={setIsAddAttachmentDialogVisible}
      >
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Attachment</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter Name"
              />
              {errors.name && (
                <span className="text-red-500 block mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                {...register("category", { required: "Category is required" })}
                placeholder="Enter Category"
              />
              {errors.category && (
                <span className="text-red-500 block mt-1">
                  {errors.category.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="uploaded_on">Uploaded On</Label>
              <Input
                type="date"
                id="uploaded_on"
                {...register("uploaded_on", {
                  required: "Upload date is required",
                })}
              />
              {errors.uploaded_on && (
                <span className="text-red-500 block mt-1">
                  {errors.uploaded_on.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="remark">Remark</Label>
              <Input
                id="remark"
                {...register("remark")}
                placeholder="Enter Remark"
              />
              {errors.remark && (
                <span className="text-red-500 block mt-1">
                  {errors.remark.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="document_date">Document Date</Label>
              <Input
                type="date"
                id="document_date"
                {...register("document_date", {
                  required: "Document date is required",
                })}
              />
              {errors.document_date && (
                <span className="text-red-500 block mt-1">
                  {errors.document_date.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="document_no">Document No</Label>
              <Input
                id="document_no"
                {...register("document_no", {
                  required: "Document number is required",
                })}
                placeholder="Enter Document No"
              />
              {errors.document_no && (
                <span className="text-red-500 block mt-1">
                  {errors.document_no.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="uploadFile">Upload File</Label>
              <Input
                name="uploadfile"
                type="file"
                {...register("uploadfile", { required: true })}
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={loading}>{!loading ? "Add" : "Please Wait"}</Button>
              <Button
                variant="outline"
                onClick={() => setIsAddAttachmentDialogVisible(false)}
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

export default DPRAttachments;