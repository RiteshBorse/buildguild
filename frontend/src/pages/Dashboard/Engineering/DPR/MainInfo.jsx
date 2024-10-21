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

const DPRMainInfo = ({ id }) => {
  const [records, setRecords] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetch records when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}engineering/dpr/main-info/${id}`
        );

        if (!apiVerify(res)) {
          toast.warning("API Error, Please contact admin");
          return;
        }

        setRecords(res.data.records);
      } catch (error) {
        const { response } = error;
        if (!response) {
          toast.error("Database connection error");
          return;
        }
        toast.error(response.data.message);
      }
    };

    fetchData();
  }, [id]);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}engineering/dpr/main-info/${id}`,
        data
      );

      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }

      setRecords((prev) => [...prev, res.data.record]);
      toast.success("Record added successfully");
      setIsDialogVisible(false);
    } catch (error) {
      const { response } = error;
      if (!response) {
        toast.error("Database connection error");
        return;
      }
      toast.error(response.data.message);
    }
  };

  // Delete a record
  const deleteRecord = async (recordId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}engineering/dpr/main-info`,
        { id: recordId }
      );

      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }

      setRecords((prev) => prev.filter((rec) => rec._id !== recordId));
      toast.success("Record deleted successfully");
    } catch (error) {
      const { response } = error;
      if (!response) {
        toast.error("Database connection error");
        return;
      }
      toast.error(response.data.message);
    }
  };

  return (
    <div>
      <Table>
        <TableHeader className="bg-gray-800">
          <TableRow>
            <TableHead className="text-white">Business Unit</TableHead>
            <TableHead className="text-white">Document Type</TableHead>
            <TableHead className="text-white">Document No</TableHead>
            <TableHead className="text-white">Contractor Name</TableHead>
            <TableHead className="text-white">Workorder No</TableHead>
            <TableHead className="text-white">Document Date</TableHead>
            <TableHead className="text-white">Parent Contractor</TableHead>
            <TableHead className="text-white">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length > 0 ? (
            records.map((rec) => (
              <TableRow key={rec._id}>
                <TableCell>{rec.business_unit}</TableCell>
                <TableCell>{rec.document_type}</TableCell>
                <TableCell>{rec.document_no}</TableCell>
                <TableCell>{rec.contractor_name}</TableCell>
                <TableCell>{rec.workorder_no}</TableCell>
                <TableCell>{rec.document_date}</TableCell>
                <TableCell>{rec.parent_contractor}</TableCell>
                <TableCell>
                  <Button
                    className="bg-red-500 hover:bg-red-700"
                    onClick={() => deleteRecord(rec._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No records available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <IoIosAddCircle
        className="text-7xl fixed bottom-10 right-10 cursor-pointer hover:scale-110 hover:animate-pulse"
        onClick={() => setIsDialogVisible(true)}
      />

      <Dialog open={isDialogVisible} onOpenChange={setIsDialogVisible}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Main Info</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Label htmlFor="business_unit">Business Unit</Label>
              <Input
                id="business_unit"
                {...register("business_unit", { required: "Business unit is required" })}
                placeholder="Enter Business Unit"
              />
              {errors.business_unit && <span className="text-red-500">{errors.business_unit.message}</span>}
            </div>

            <div className="mb-4">
              <Label htmlFor="document_type">Document Type</Label>
              <Input
                id="document_type"
                {...register("document_type", { required: "Document type is required" })}
                placeholder="Enter Document Type"
              />
              {errors.document_type && <span className="text-red-500">{errors.document_type.message}</span>}
            </div>

            <div className="mb-4">
              <Label htmlFor="document_no">Document No</Label>
              <Input
                id="document_no"
                {...register("document_no", { required: "Document number is required" })}
                placeholder="Enter Document No"
              />
              {errors.document_no && <span className="text-red-500">{errors.document_no.message}</span>}
            </div>

            <div className="mb-4">
              <Label htmlFor="contractor_name">Contractor Name</Label>
              <Input
                id="contractor_name"
                {...register("contractor_name", { required: "Contractor name is required" })}
                placeholder="Enter Contractor Name"
              />
              {errors.contractor_name && <span className="text-red-500">{errors.contractor_name.message}</span>}
            </div>

            <div className="mb-4">
              <Label htmlFor="workorder_no">Workorder No</Label>
              <Input
                id="workorder_no"
                {...register("workorder_no", { required: "Workorder number is required" })}
                placeholder="Enter Workorder No"
              />
              {errors.workorder_no && <span className="text-red-500">{errors.workorder_no.message}</span>}
            </div>

            <div className="mb-4">
              <Label htmlFor="document_date">Document Date</Label>
              <Input
                id="document_date"
                type="date"
                {...register("document_date", { required: "Document date is required" })}
              />
              {errors.document_date && <span className="text-red-500">{errors.document_date.message}</span>}
            </div>

            <div className="mb-4">
              <Label htmlFor="parent_contractor">Parent Contractor</Label>
              <Input
                id="parent_contractor"
                {...register("parent_contractor", { required: "Parent contractor is required" })}
                placeholder="Enter Parent Contractor"
              />
              {errors.parent_contractor && <span className="text-red-500">{errors.parent_contractor.message}</span>}
            </div>

            <DialogFooter>
              <Button type="submit">Submit</Button>
              <Button variant="outline" onClick={() => setIsDialogVisible(false)}>
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DPRMainInfo;
