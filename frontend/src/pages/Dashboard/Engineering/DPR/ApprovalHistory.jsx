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

const DPRApprovalHistory = ({ id }) => {
  const [approvals, setApprovals] = useState([]);
  const [approve, setApprove] = useState({});

  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/materials/approvalhis/${id}`
      );

      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }

      setApprovals(res.data.approval_history);
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

  const approveItem = async (id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/materials/approveItem`,
        { id }
      );

      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }

      setApprovals((prev) =>
        prev.map((doc) =>
          doc._id === id ? { ...doc, status: "Approved" , approved_by:res.data.approve.approved_by, approval_date: res.data.approve.approval_date } : doc
        )
      );
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

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div>
      <Table>
        <TableHeader className="bg-black">
          <TableRow>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-white">Code</TableHead>
            <TableHead className="text-white">Description</TableHead>
            <TableHead className="text-white">Amount</TableHead>
            <TableHead className="text-white">Created By</TableHead>
            <TableHead className="text-white">Approved By</TableHead>
            <TableHead className="text-white">Approve</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {approvals && approvals.length > 0 ? (
            approvals.map((approval) => (
              <TableRow key={approval._id}>
                 <TableCell>{approval.approval_date}</TableCell>
                <TableCell>{approval.code}</TableCell>
                <TableCell>{approval.description}</TableCell>
                <TableCell>{approval.amount}</TableCell>
                <TableCell>{approval.created_by}</TableCell>
                <TableCell>{approval.approved_by}</TableCell>
                <TableCell>
                  {approval.status != "Approved" ? (
                    <Button
                      onClick={() => {
                        approveItem(approval._id);
                      }}
                    >
                      {" "}
                      Approve
                    </Button>
                  ) : (
                    <Button disabled> Approved </Button>
                  )}{" "}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No approval history available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DPRApprovalHistory;