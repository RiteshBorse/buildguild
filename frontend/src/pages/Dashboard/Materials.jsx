import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
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

const Materials = () => {
  const [selection, setSelection] = useState("main-info");
  const { id } = useParams();
  const handleClick = (value) => {
    setSelection(value);
  };

  const buttonOptions = [
    { label: "Main Info", value: "main-info" },
    { label: "Item Info", value: "item-info" },
    { label: "Billing Term", value: "billing-term" },
    { label: "Attachment", value: "attachment" },
    { label: "Approval History", value: "approval-history" },
    { label: "Change History", value: "change-history" },
  ];

  return (
    <div className="w-full h-screen pt-[85px] px-8 py-10 ">
      <div className="flex items-center m-2 w-full h-fit">
        <Sidebar />
        <div className="w-full flex items-center justify-center">
          {buttonOptions.map((option) => (
            <Button
              key={option.value}
              variant="ghost"
              className={`text-black ${
                selection === option.value ? "bg-gray-200" : ""
              }`}
              onClick={() => handleClick(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
      <Separator />

      {selection === "main-info" && <MainInfo id={id} />}
      {selection === "item-info" && <ItemInfo id={id} />}
      {selection === "billing-term" && <BillingTerm id={id} />}
      {selection === "attachment" && <Attachment id={id} />}
      {selection === "approval-history" && <ApprovalHistory id={id} />}
      {selection === "change-history" && <ChangeHistory id={id} />}
    </div>
  );
};

const MainInfo = ({ id }) => {
  const [mainInfos, setMainInfos] = useState([]);
  const [isAddMainInfoDialogVisible, setIsAddMainInfoDialogVisible] =
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
          `${import.meta.env.VITE_API_URL}/materials/main-info/${id}`
        );

        if (!apiVerify(res)) {
          toast.warning("API Error, Please contact admin");
          return;
        }

        setMainInfos(res.data.main_info);
        toast.success("Main Info Loaded");
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
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/materials/main-info/${id}`,
        data
      );

      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }

      setMainInfos((prev) => [...prev, res.data.main_info]); // Update the state with the new main info
      toast.success("Main Info Added Successfully");
      setIsAddMainInfoDialogVisible(false);
    } catch (error) {
      const { response } = error;
      if (!response) {
        toast.error("Database connection error");
        return;
      }
      toast.error(response.data.message);
    }
  };

  const deleteMainInfo = async (id) => {
    console.log(id);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/materials/main-info`,
        { id }
      );
      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }
      setMainInfos((prev) => prev.filter((maininfo) => maininfo._id !== id));
      toast.success("Main Info Deleted");
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
            <TableHead className="text-white">Business Unit</TableHead>
            <TableHead className="text-white">Financial Year</TableHead>
            <TableHead className="text-white">Document Type</TableHead>
            <TableHead className="text-white">Document Date</TableHead>
            <TableHead className="text-white">Document No</TableHead>
            <TableHead className="text-white">Supplier</TableHead>
            <TableHead className="text-white">Parent Account</TableHead>
            <TableHead className="text-white">Quotation No</TableHead>
            <TableHead className="text-white">Quotation Date</TableHead>
            <TableHead className="text-white">Party Ref No</TableHead>
            <TableHead className="text-white">Rate Basis</TableHead>
            <TableHead className="text-white">Credit Period</TableHead>
            <TableHead className="text-white">Days From</TableHead>
            <TableHead className="text-white">Approval Note</TableHead>
            <TableHead className="text-white">Remark</TableHead>
            <TableHead className="text-white">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mainInfos && mainInfos.length > 0 ? (
            mainInfos.map((mainInfo) => (
              <TableRow key={mainInfo._id}>
                <TableCell>{mainInfo.business_unit}</TableCell>
                <TableCell>{mainInfo.financial_year}</TableCell>
                <TableCell>{mainInfo.document_type}</TableCell>
                <TableCell>{formatDate(mainInfo.document_date)}</TableCell>
                <TableCell>{mainInfo.document_no}</TableCell>
                <TableCell>{mainInfo.supplier}</TableCell>
                <TableCell>{mainInfo.parent_account}</TableCell>
                <TableCell>{mainInfo.quotation_no}</TableCell>
                <TableCell>{formatDate(mainInfo.quotation_date)}</TableCell>
                <TableCell>{mainInfo.party_ref_no}</TableCell>
                <TableCell>{mainInfo.rate_basis}</TableCell>
                <TableCell>{mainInfo.credit_period}</TableCell>
                <TableCell>{mainInfo.days_from}</TableCell>
                <TableCell>{mainInfo.approval_note}</TableCell>
                <TableCell>{mainInfo.remark}</TableCell>
                <TableCell>
                  {" "}
                  <Button
                    className="bg-red-500 hover:bg-red-700"
                    onClick={() => {
                      deleteMainInfo(mainInfo._id);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={15} className="text-center">
                No main info available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <IoIosAddCircle
        className="text-7xl fixed bottom-10 right-10 hover:cursor-pointer hover:scale-110 hover:animate-pulse"
        onClick={() => setIsAddMainInfoDialogVisible(true)}
      />

      <Dialog
        open={isAddMainInfoDialogVisible}
        onOpenChange={setIsAddMainInfoDialogVisible}
      >
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Main Info</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Label htmlFor="business_unit">Business Unit</Label>
              <Input
                id="business_unit"
                {...register("business_unit", {
                  required: "Business Unit is required",
                })}
                placeholder="Enter Business Unit"
              />
              {errors.business_unit && (
                <span className="text-red-500 block mt-1">
                  {errors.business_unit.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="financial_year">Financial Year</Label>
              <Input
                id="financial_year"
                type="number"
                {...register("financial_year", {
                  required: "Financial Year is required",
                  valueAsNumber: true,
                })}
                placeholder="Enter Financial Year"
              />
              {errors.financial_year && (
                <span className="text-red-500 block mt-1">
                  {errors.financial_year.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="document_type">Document Type</Label>
              <Input
                id="document_type"
                {...register("document_type", {
                  required: "Document Type is required",
                })}
                placeholder="Enter Document Type"
              />
              {errors.document_type && (
                <span className="text-red-500 block mt-1">
                  {errors.document_type.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="document_date">Document Date</Label>
              <Input
                id="document_date"
                type="date"
                {...register("document_date", {
                  required: "Document Date is required",
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
                  required: "Document No is required",
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
              <Label htmlFor="supplier">Supplier</Label>
              <Input
                id="supplier"
                {...register("supplier", {
                  required: "Supplier is required",
                })}
                placeholder="Enter Supplier"
              />
              {errors.supplier && (
                <span className="text-red-500 block mt-1">
                  {errors.supplier.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="parent_account">Parent Account</Label>
              <Input
                id="parent_account"
                {...register("parent_account", {
                  required: "Parent Account is required",
                })}
                placeholder="Enter Parent Account"
              />
              {errors.parent_account && (
                <span className="text-red-500 block mt-1">
                  {errors.parent_account.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="quotation_no">Quotation No</Label>
              <Input
                id="quotation_no"
                {...register("quotation_no", {
                  required: "Quotation No is required",
                })}
                placeholder="Enter Quotation No"
              />
              {errors.quotation_no && (
                <span className="text-red-500 block mt-1">
                  {errors.quotation_no.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="quotation_date">Quotation Date</Label>
              <Input
                id="quotation_date"
                type="date"
                {...register("quotation_date", {
                  required: "Quotation Date is required",
                })}
              />
              {errors.quotation_date && (
                <span className="text-red-500 block mt-1">
                  {errors.quotation_date.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="party_ref_no">Party Ref No</Label>
              <Input
                id="party_ref_no"
                {...register("party_ref_no", {
                  required: "Party Ref No is required",
                })}
                placeholder="Enter Party Ref No"
              />
              {errors.party_ref_no && (
                <span className="text-red-500 block mt-1">
                  {errors.party_ref_no.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="rate_basis">Rate Basis</Label>
              <Input
                id="rate_basis"
                {...register("rate_basis", {
                  required: "Rate Basis is required",
                })}
                placeholder="Enter Rate Basis"
              />
              {errors.rate_basis && (
                <span className="text-red-500 block mt-1">
                  {errors.rate_basis.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="credit_period">Credit Period</Label>
              <Input
                id="credit_period"
                type="number"
                {...register("credit_period", {
                  required: "Credit Period is required",
                })}
                placeholder="Enter Credit Period"
              />
              {errors.credit_period && (
                <span className="text-red-500 block mt-1">
                  {errors.credit_period.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="days_from">Days From</Label>
              <Input
                id="days_from"
                type="number"
                {...register("days_from", {
                  required: "Days From is required",
                })}
                placeholder="Enter Days From"
              />
              {errors.days_from && (
                <span className="text-red-500 block mt-1">
                  {errors.days_from.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="approval_note">Approval Note</Label>
              <Input
                id="approval_note"
                {...register("approval_note", {
                  required: "Approval Note is required",
                })}
                placeholder="Enter Approval Note"
              />
              {errors.approval_note && (
                <span className="text-red-500 block mt-1">
                  {errors.approval_note.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="remark">Remark</Label>
              <Input
                id="remark"
                {...register("remark", {
                  required: "Remark is required",
                })}
                placeholder="Enter Remark"
              />
              {errors.remark && (
                <span className="text-red-500 block mt-1">
                  {errors.remark.message}
                </span>
              )}
            </div>

            <Button type="submit">Add Main Info</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Attachment = ({ id }) => {
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
          `${import.meta.env.VITE_API_URL}/materials/attachment/${id}`
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
        `${import.meta.env.VITE_API_URL}/materials/attachment/${id}`,
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
        `${import.meta.env.VITE_API_URL}/materials/attachment`,
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

const ItemInfo = ({ id }) => {
  const [itemInfos, setItemInfos] = useState([]);
  const [isAddItemInfoDialogVisible, setIsAddItemInfoDialogVisible] =
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
          `${import.meta.env.VITE_API_URL}/materials/item-info/${id}`
        );

        if (!apiVerify(res)) {
          toast.warning("API Error, Please contact admin");
          return;
        }

        setItemInfos(res.data.iteminfo);
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
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/materials/item-info/${id}`,
        data
      );

      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }

      setItemInfos((prev) => [...prev, res.data.iteminfo]); // Update the state with the new item info
      toast.success("Item Info Added Successfully");
      setIsAddItemInfoDialogVisible(false);
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

  const deleteItemInfo = async (id) => {
    console.log(id);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/materials/item-info`,
        { id }
      );
      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }
      setItemInfos((prev) => prev.filter((itemInfo) => itemInfo._id !== id));
      toast.success("Item Info Deleted");
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
            <TableHead className="text-white">Unit</TableHead>
            <TableHead className="text-white">Quantity</TableHead>
            <TableHead className="text-white">Rate</TableHead>
            <TableHead className="text-white">Amount</TableHead>
            <TableHead className="text-white">Terms</TableHead>
            <TableHead className="text-white">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {itemInfos && itemInfos.length > 0 ? (
            itemInfos.map((itemInfo) => (
              <TableRow key={itemInfo._id}>
                <TableCell>{itemInfo.code}</TableCell>
                <TableCell>{itemInfo.description}</TableCell>
                <TableCell>{itemInfo.unit}</TableCell>
                <TableCell>{itemInfo.quantity}</TableCell>
                <TableCell>{itemInfo.rate}</TableCell>
                <TableCell>{itemInfo.amount}</TableCell>
                <TableCell>{itemInfo.terms}</TableCell>
                <TableCell>
                  {" "}
                  <Button
                    className="bg-red-500 hover:bg-red-700"
                    onClick={() => {
                      deleteItemInfo(itemInfo._id);
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
                No item info available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <IoIosAddCircle
        className="text-7xl fixed bottom-10 right-10 hover:cursor-pointer hover:scale-110 hover:animate-pulse"
        onClick={() => setIsAddItemInfoDialogVisible(true)}
      />

      <Dialog
        open={isAddItemInfoDialogVisible}
        onOpenChange={setIsAddItemInfoDialogVisible}
      >
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Item Info</DialogTitle>
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
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                {...register("unit", { required: "Unit is required" })}
                placeholder="Enter Unit"
              />
              {errors.unit && (
                <span className="text-red-500 block mt-1">
                  {errors.unit.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                {...register("quantity", {
                  required: "Quantity is required",
                  valueAsNumber: true,
                })}
                placeholder="Enter Quantity"
              />
              {errors.quantity && (
                <span className="text-red-500 block mt-1">
                  {errors.quantity.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="rate">Rate</Label>
              <Input
                id="rate"
                type="number"
                {...register("rate", {
                  required: "Rate is required",
                  valueAsNumber: true,
                })}
                placeholder="Enter Rate"
              />
              {errors.rate && (
                <span className="text-red-500 block mt-1">
                  {errors.rate.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                {...register("amount", {
                  required: "Amount is required",
                  valueAsNumber: true,
                })}
                placeholder="Enter Amount"
              />
              {errors.amount && (
                <span className="text-red-500 block mt-1">
                  {errors.amount.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="terms">Terms</Label>
              <Input
                id="terms"
                {...register("terms")}
                placeholder="Enter Terms"
              />
              {errors.terms && (
                <span className="text-red-500 block mt-1">
                  {errors.terms.message}
                </span>
              )}
            </div>

            <DialogFooter>
              <Button type="submit">Add</Button>
              <Button
                variant="outline"
                onClick={() => setIsAddItemInfoDialogVisible(false)}
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

const BillingTerm = ({ id }) => {
  const [billingTerms, setBillingTerms] = useState([]);
  const [isAddBillingTermDialogVisible, setIsAddBillingTermDialogVisible] =
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
          `${import.meta.env.VITE_API_URL}/materials/billingterm/${id}`
        );

        if (!apiVerify(res)) {
          toast.warning("API Error, Please contact admin");
          return;
        }

        setBillingTerms(res.data.billing_term);
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
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/materials/billingterm/${id}`,
        data
      );

      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }

      setBillingTerms((prev) => [...prev, res.data.billing_term]); // Update the state with the new billing term
      toast.success("Billing Term Added Successfully");
      setIsAddBillingTermDialogVisible(false);
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

  const deleteBillingTerm = async (id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/materials/billingterm`,
        { id }
      );
      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }
      setBillingTerms((prev) =>
        prev.filter((billingTerm) => billingTerm._id !== id)
      );
      toast.success("Billing Term Deleted");
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
            <TableHead className="text-white">Basic</TableHead>
            <TableHead className="text-white">IGST</TableHead>
            <TableHead className="text-white">Discount</TableHead>
            <TableHead className="text-white">Round Off</TableHead>
            <TableHead className="text-white">Gross</TableHead>
            <TableHead className="text-white">Net</TableHead>
            <TableHead className="text-white">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {billingTerms && billingTerms.length > 0 ? (
            billingTerms.map((term) => (
              <TableRow key={term._id}>
                <TableCell>{term.basic}</TableCell>
                <TableCell>{term.igst}</TableCell>
                <TableCell>{term.discount}</TableCell>
                <TableCell>{term.round_of}</TableCell>
                <TableCell>{term.gross}</TableCell>
                <TableCell>{term.net}</TableCell>
                <TableCell>
                  {" "}
                  <Button
                    className="bg-red-500 hover:bg-red-700"
                    onClick={() => {
                      deleteBillingTerm(term._id);
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
                No billing terms available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <IoIosAddCircle
        className="text-7xl fixed bottom-10 right-10 hover:cursor-pointer hover:scale-110 hover:animate-pulse"
        onClick={() => setIsAddBillingTermDialogVisible(true)}
      />

      <Dialog
        open={isAddBillingTermDialogVisible}
        onOpenChange={setIsAddBillingTermDialogVisible}
      >
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Billing Term</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Label htmlFor="basic">Basic</Label>
              <Input
                id="basic"
                type="number"
                {...register("basic", { required: "Basic is required" })}
                placeholder="Enter Basic"
              />
              {errors.basic && (
                <span className="text-red-500 block mt-1">
                  {errors.basic.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="igst">IGST</Label>
              <Input
                id="igst"
                type="number"
                {...register("igst", { required: "IGST is required" })}
                placeholder="Enter IGST"
              />
              {errors.igst && (
                <span className="text-red-500 block mt-1">
                  {errors.igst.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="discount">Discount</Label>
              <Input
                id="discount"
                type="number"
                {...register("discount", { required: "Discount is required" })}
                placeholder="Enter Discount"
              />
              {errors.discount && (
                <span className="text-red-500 block mt-1">
                  {errors.discount.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="round_of">Round Off</Label>
              <Input
                id="round_of"
                type="number"
                {...register("round_of", { required: "Round off is required" })}
                placeholder="Enter Round Off"
              />
              {errors.round_of && (
                <span className="text-red-500 block mt-1">
                  {errors.round_of.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="gross">Gross</Label>
              <Input
                id="gross"
                type="number"
                {...register("gross", { required: "Gross is required" })}
                placeholder="Enter Gross"
              />
              {errors.gross && (
                <span className="text-red-500 block mt-1">
                  {errors.gross.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="net">Net</Label>
              <Input
                id="net"
                type="number"
                {...register("net", { required: "Net is required" })}
                placeholder="Enter Net"
              />
              {errors.net && (
                <span className="text-red-500 block mt-1">
                  {errors.net.message}
                </span>
              )}
            </div>

            <DialogFooter>
              <Button type="submit">Add</Button>
              <Button
                variant="outline"
                onClick={() => setIsAddBillingTermDialogVisible(false)}
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

const ApprovalHistory = ({ id }) => {
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

const ChangeHistory = ({ id }) => {
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

export default Materials;
