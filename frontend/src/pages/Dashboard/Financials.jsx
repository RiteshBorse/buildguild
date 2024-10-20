import { useEffect } from "react";
import { useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import{
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from  "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

const Financials = () => {
  const [selection, setSelection] = useState("daily-wages");
  const [subSection, setSubSection] = useState("main-info");
  const { id } = useParams();

  const handleClick = (value) => {
    setSelection(value);
  };



  const buttonOptions = [
    { label: "Daily Wages", value: "daily-wages" },
    { label: "Receipt", value: "receipt" },
  ];

  const receiptSubSections = [
    { label: "Main Info", value: "main-info" },
    { label: "Attachment", value: "attachment" },
    { label: "Change History", value: "change-history" },
    { label: "Approval History", value: "approval-history" },
  ];

 
  const renderSection = () => {
    if (selection === "receipt") {
      return (
        <>
          <div className="flex gap-5  justify-center  mb-2">
            {receiptSubSections.map((sub) => (
              <Button
                key={sub.value}
                variant="ghost"
                className={`text-black ${subSection === sub.value ? "bg-gray-200" : ""}`}
                onClick={() => setSubSection(sub.value)}
              >
                {sub.label}
              </Button>
            ))}
          </div>
          <Separator />
          {subSection === "main-info" && <MainInfo id={id} />}
          {subSection === "attachment" && <Attachment id={id} />}
          {subSection === "change-history" && <ChangeHistory id={id} />}
          {subSection === "approval-history" && <ApprovalHistory id={id} />}
        </>
      );
    }

    if (selection === "daily-wages") {
      return <DailyWages id={id} />;
    }
  };

  return (
    <div className="w-full h-screen pt-[85px] px-2 md:px-8 py-10">
      <div className="flex md:flex-row  md:items-start w-full  h-fit my-1">
        <div className="flex  self-center">
        <Sidebar />
        </div>

        <div className="w-full md:flex justify-center flex-wrap  hidden ">
          {buttonOptions.map((option) => (
            <Button
              key={option.value}
              variant="ghost"
              className={`text-black ${selection === option.value ? "bg-gray-400" : ""}`}
              onClick={() => {
                setSelection(option.value);
                setSubSection(option.value === "receipt" ? "main-info" : "");
              }}
            >
              {option.label}
            </Button>
          ))}
        </div>

        <div className="md:hidden  flex ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="bg-gray-100 hover:font-normal text-black border-2 hover:text-white">Sections</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {buttonOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => {
                    setSelection(option.value);
                    setSubSection(option.value === "receipt" ? "main-info" : "");
                  }}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Separator />
      <div className="mt-4">{renderSection()}</div>
    </div>
  );
};

const DailyWages = ({ id }) => {
  const [dailyWages, setDailyWages] = useState([]);
  const [isAddDailyWagesDialogVisible, setIsAddDailyWagesDialogVisible] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/financials/daily-wages/${id}`
        );

        if (!apiVerify(res)) {
          toast.warning("API Error, Please contact admin");
          return;
        }

        setDailyWages(res.data.daily_wages);
    
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
        `${import.meta.env.VITE_API_URL}/financials/daily-wages/${id}`,
        data
      );

      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }

      setDailyWages((prev) => [...prev, res.data.daily_wages]); // Update the state with the new entry
      toast.success("Daily Wages Added Successfully");
      setIsAddDailyWagesDialogVisible(false);
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
    <div className="m-1">
      <Table>
        <TableHeader className="bg-black ">
          <TableRow>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-white">Wages</TableHead>
            <TableHead className="text-white">Working Hours</TableHead>
            <TableHead className="text-white">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dailyWages && dailyWages.length > 0 ? (
            dailyWages.map((wage) => (
              <TableRow key={wage._id}>
                <TableCell>{wage.name}</TableCell>
                <TableCell>{wage.date}</TableCell>
                <TableCell>{wage.wages}</TableCell>
                <TableCell>{wage.working_hr}</TableCell>
                <TableCell><Button disabled>Paid</Button></TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No daily wages available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <IoIosAddCircle
        className="text-7xl fixed bottom-10 right-10 hover:cursor-pointer hover:scale-110 hover:animate-pulse"
        onClick={() => setIsAddDailyWagesDialogVisible(true)}
      />

      <Dialog
        open={isAddDailyWagesDialogVisible}
        onOpenChange={setIsAddDailyWagesDialogVisible}
      >
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add Daily Wages</DialogTitle>
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
              <Label htmlFor="date">Date</Label>
              <Input
                type="date"
                id="date"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && (
                <span className="text-red-500 block mt-1">
                  {errors.date.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="wages">Wages</Label>
              <Input
                id="wages"
                {...register("wages", { required: "Wages are required" })}
                placeholder="Enter Wages"
              />
              {errors.wages && (
                <span className="text-red-500 block mt-1">
                  {errors.wages.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="working_hr">Working Hours</Label>
              <Input
                id="working_hr"
                {...register("working_hr", {
                  required: "Working hours are required",
                })}
                placeholder="Enter Working Hours"
              />
              {errors.working_hr && (
                <span className="text-red-500 block mt-1">
                  {errors.working_hr.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="daily_rate">Daily Rate</Label>
              <Input
                id="daily_rate"
                {...register("daily_rate", {
                  required: "Daily rate is required",
                })}
                placeholder="Enter Daily Rate"
              />
              {errors.daily_rate && (
                <span className="text-red-500 block mt-1">
                  {errors.daily_rate.message}
                </span>
              )}
            </div>

            <DialogFooter>
            <Button className="m-1" type="button" onClick={() => setIsAddMainInfoDialogVisible(false)}>
                Cancel
              </Button>
              <Button className="m-1" type="submit">Add Daily Wages</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const MainInfo = ({ id }) => {
  const [mainInfo, setMainInfo] = useState([]);
  const [isAddMainInfoDialogVisible, setIsAddMainInfoDialogVisible] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/financials/main-info/${id}`
        );

        if (!apiVerify(res)) {
          toast.warning("API Error, Please contact admin");
          return;
        }

        setMainInfo(res.data.main_info);
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
      const mainData = {
        business_unit: data.business_unit,
        document_type: data.document_type,
        document_no: data.document_no,
        bank: data.bank,
        financial_year: data.financial_year,
        document_date: data.document_date,
        narration: data.narration,
        wages: data.wages,
        working_hr: data.working_hr,
        daily_rate: data.daily_rate,
      };

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/financials/main-info/${id}`,
        mainData 
      );

      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }

      setMainInfo((prev) => [...prev, res.data.main_info]);
      toast.success("Main Info Added Successfully");
      setIsAddMainInfoDialogVisible(false);
      reset(); 

    } catch (error) {
      const { response } = error;
      if (!response) {
        toast.error("Database connection error");
        return;
      }
      toast.error(response.data.message);
    }
  };
  const deleteMainInfo = async(id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/financials/main-info`, {id}
      );
      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }
      setMainInfo((prev) => prev.filter((main_info) => main_info._id !== id));
      toast.success("Information Deleted");
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
    <div className="m-1">
      <Table>
        <TableHeader className="bg-black">
          <TableRow>
            <TableHead className="text-white">Business Unit</TableHead>
            <TableHead className="text-white">Document Type</TableHead>
            <TableHead className="text-white">Document No</TableHead>
            <TableHead className="text-white">Bank</TableHead>
            <TableHead className="text-white">Financial Year</TableHead>
            <TableHead className="text-white">Document Date</TableHead>
            <TableHead className="text-white">Narration  </TableHead>
            <TableHead className="text-white">  </TableHead>
           
          </TableRow>
        </TableHeader>
        <TableBody>
          {mainInfo && mainInfo.length > 0 ? (
            mainInfo.map((info) => (
              <TableRow key={info._id}>
                <TableCell>{info.business_unit}</TableCell>
                <TableCell>{info.document_type}</TableCell>
                <TableCell>{info.document_no}</TableCell>
                <TableCell>{info.bank}</TableCell>
                <TableCell>{info.financial_year}</TableCell>
                <TableCell>{info.document_date}</TableCell>
                <TableCell>{info.narration}    
                
                 </TableCell>
                 <TableCell className="flex gap-2">
                 <Button >Edit</Button>
                 <Button className="bg-red-500 hover:bg-red-700" onClick={()=>{deleteMainInfo(info._id)}}>Delete</Button>
                 </TableCell>
                
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="text-center">
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
                {...register("business_unit", { required: "Business Unit is required" })}
                placeholder="Enter Business Unit"
              />
              {errors.business_unit && (
                <span className="text-red-500 block mt-1">
                  {errors.business_unit.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="document_type">Document Type</Label>
              <Input
                id="document_type"
                {...register("document_type", { required: "Document Type is required" })}
                placeholder="Enter Document Type"
              />
              {errors.document_type && (
                <span className="text-red-500 block mt-1">
                  {errors.document_type.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="document_no">Document No</Label>
              <Input
                id="document_no"
                {...register("document_no", { required: "Document No is required" })}
                placeholder="Enter Document No"
              />
              {errors.document_no && (
                <span className="text-red-500 block mt-1">
                  {errors.document_no.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="bank">Bank</Label>
              <Input
                id="bank"
                {...register("bank", { required: "Bank is required" })}
                placeholder="Enter Bank"
              />
              {errors.bank && (
                <span className="text-red-500 block mt-1">
                  {errors.bank.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="financial_year">Financial Year</Label>
              <Input
                id="financial_year"
                {...register("financial_year", {
                  required: "Financial Year is required",
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
              <Label htmlFor="document_date">Document Date</Label>
              <Input
                type="date"
                id="document_date"
                {...register("document_date", { required: "Document Date is required" })}
              />
              {errors.document_date && (
                <span className="text-red-500 block mt-1">
                  {errors.document_date.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <Label htmlFor="narration">Narration</Label>
              <Input
                id="narration"
                {...register("narration", {
                  required: "Narration is required",
                })}
                placeholder="Enter Narration"
              />
              {errors.narration && (
                <span className="text-red-500 block mt-1">
                  {errors.narration.message}
                </span>
              )}
            </div>

  
            <DialogFooter>
              <Button className="m-1" type="button" onClick={() => setIsAddMainInfoDialogVisible(false)}>
                Cancel
              </Button>
              <Button className="m-1" type="submit">Add Main Info</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
  </div>
  );
};

const ChangeHistory = ({ id }) => {
  const [changeHistory, setChangeHistory] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/financials/change-history/${id}`
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


const Attachment = ({ id }) => {
  const [attachments, setAttachments] = useState([]);
  const [isAddAttachmentDialogVisible, setIsAddAttachmentDialogVisible] =
    useState(false);
  const [loading , setloading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/financials/attachment/${id}`
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
    const attachment = {
      ...data,
      uploadfile : data.uploadfile[0],
    }  
    setloading(true)
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/financials/attachment/${id}`,
          attachment,
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
      setAttachments((prev) => [...prev, res.data.attachment]); // Update the state with the new attachment
      toast.success("Attachment Added Successfully");
      setloading(false)
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
  const deleteAttachment = async(id) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/financials/attachment`, {id}
      );
      if (!apiVerify(res)) {
        toast.warning("API Error, Please contact admin");
        return;
      }
      setAttachments((prev) => prev.filter((attachment) => attachment._id !== id));
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
  }

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
            <TableHead className="text-white text-center">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attachments && attachments.length > 0 ? (
            attachments.map((attachment) => (
              <TableRow key={attachment._id}>
                <TableCell>{attachment.name}</TableCell>
                <TableCell>{attachment.category}</TableCell>
                <TableCell>{attachment.uploaded_on}</TableCell>
                <TableCell>{attachment.remark}</TableCell>
                <TableCell>{attachment.document_date}</TableCell>
                <TableCell>{attachment.document_no}</TableCell>
                <TableCell className="flex gap-2 items-center justify-center">
                  <Button variant="outline" onClick={() => window.open(attachment.display_file, '_blank')}>View</Button>
                  <Button>Edit</Button>
                <Button className="bg-red-500 hover:bg-red-700" onClick={()=>{deleteAttachment(attachment._id)}}>Delete</Button></TableCell>
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
              <Label htmlFor="upload_file">Upload File</Label>
              <Input
              type ="file"
              name="uploadfile"
                id="uploadfile"
                {...register("uploadfile", {
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
            
            <DialogFooter>
            <Button className="m-1" type="button" onClick={() => setIsAddMainInfoDialogVisible(false)}>
                Cancel
              </Button>
              <Button className="m-1" type="submit" disabled={loading}>{!loading ? "Add Attachments" :<div className="flex gap-2 items-center justify-center"><Loader2 className="animate-spin"/><p>Please Wait</p></div>}</Button>
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
        `${import.meta.env.VITE_API_URL}/financials/approval-history/${id}`
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
 const approveItem = async(id) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/financials/approveItem`, {id}
    );
    if (!apiVerify(res)) {
      toast.warning("API Error, Please contact admin");
      return;
    }

    setApprovals((prev) =>
      prev.map((doc) =>
        doc._id === id ? { ...doc, status: 'Approved' , approved_by : res.data.approve.approved_by  } : doc
      )
    );
    toast.success("Item Approved")
  
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
      <Table >
        <TableHeader className="bg-black">
          <TableRow>
          <TableHead className="text-white">Document Number</TableHead>
            <TableHead className="text-white">Busines Unit</TableHead>
            <TableHead className="text-white">Date</TableHead>
            <TableHead className="text-white">Created By</TableHead>
            <TableHead className="text-white">Approved By</TableHead>
            <TableHead className="text-white">Status</TableHead>
            <TableHead className="text-white">Approve</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {approvals && approvals.length > 0 ? (
            approvals.map((approval) => (
              <TableRow key={approval._id}>
                   <TableCell>{approval.document_no}</TableCell>
                <TableCell>{approval.business_unit}</TableCell>
           
                <TableCell>
                  {approval.creation_date || "-"}
                </TableCell>
             
                <TableCell>{approval.created_by}</TableCell>
                <TableCell>{approval.approved_by}</TableCell>
                <TableCell>{approval.status}</TableCell>
                <TableCell>  {approval.status != "Approved" ? <Button onClick = {() => {approveItem(approval._id)} }> Approve</Button> : <Button disabled> Approved </Button> } </TableCell>
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

export default Financials;
