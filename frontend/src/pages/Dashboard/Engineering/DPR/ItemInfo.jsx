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

const DPRItemInfo = ({ id }) => {
  const [records, setRecords] = useState([]);
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}engineering/dpr/item-info/${id}`
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

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}engineering/dpr/item-info/${id}`,
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

  const deleteRecord = async (recordId) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}engineering/dpr/item-info`,
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
            <TableHead className="text-white">Activity</TableHead>
            <TableHead className="text-white">Unit</TableHead>
            <TableHead className="text-white">Description</TableHead>
            <TableHead className="text-white">Long Description</TableHead>
            <TableHead className="text-white">Remarks</TableHead>
            <TableHead className="text-white">Order Quantity</TableHead>
            <TableHead className="text-white">WBS Quantity</TableHead>
            <TableHead className="text-white">Executed Quantity</TableHead>
            <TableHead className="text-white">Tolerance Percent</TableHead>
            <TableHead className="text-white">Upto Executes</TableHead>
            <TableHead className="text-white">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length > 0 ? (
            records.map((rec) => (
              <TableRow key={rec._id}>
                <TableCell>{rec.activity}</TableCell>
                <TableCell>{rec.unit}</TableCell>
                <TableCell>{rec.description}</TableCell>
                <TableCell>{rec.long_description}</TableCell>
                <TableCell>{rec.remarks}</TableCell>
                <TableCell>{rec.order_quantity}</TableCell>
                <TableCell>{rec.wbs_quantity}</TableCell>
                <TableCell>{rec.executed_quantity}</TableCell>
                <TableCell>{rec.tolerance_percent}</TableCell>
                <TableCell>{rec.upto_executes}</TableCell>
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
              <TableCell colSpan={11} className="text-center">
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
            <DialogTitle>Add DPR Item Info</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            {[
              "activity",
              "unit",
              "description",
              "long_description",
              "remarks",
              "order_quantity",
              "wbs_quantity",
              "executed_quantity",
              "tolerance_percent",
              "upto_executes",
            ].map((field) => (
              <div className="mb-4" key={field}>
                <Label htmlFor={field}>
                  {field.replace("_", " ").toUpperCase()}
                </Label>
                <Input
                  id={field}
                  {...register(field, { required: `${field} is required` })}
                  placeholder={`Enter ${field.replace("_", " ")}`}
                  type={field.includes("quantity") || field === "tolerance_percent" ? "number" : "text"}
                />
                {errors[field] && (
                  <span className="text-red-500">
                    {errors[field].message}
                  </span>
                )}
              </div>
            ))}

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

export default DPRItemInfo;
