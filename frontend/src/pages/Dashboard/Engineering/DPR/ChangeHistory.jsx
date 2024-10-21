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

const DPRChangeHistory = ({ id }) => {
  const [changeHistory, setChangeHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/materials/changehis/${id}`
        );

        if (!apiVerify(res)) {
          toast.warning("API Error, Please contact admin");
          return;
        }

        setChangeHistory(res.data.change_history); // Assuming the backend returns `change_history`
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

  return (
    <div>
      <Table>
        <TableHeader className="bg-black">
          <TableRow>
            <TableHead className="text-white">Changed By</TableHead>
            <TableHead className="text-white">Changed Section</TableHead>
            <TableHead className="text-white">Changed Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {changeHistory && changeHistory.length > 0 ? (
            changeHistory.map((history) => (
              <TableRow key={history._id}>
                <TableCell>{history.changed_by}</TableCell>
                <TableCell>{history.changed_section}</TableCell>
                <TableCell>
                  {new Date(history.changed_time).toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="text-center">
                No change history available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DPRChangeHistory;