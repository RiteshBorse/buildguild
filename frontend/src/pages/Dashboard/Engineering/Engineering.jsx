import { useState } from "react";
import Sidebar from "../Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiVerify } from "@/schema/apiSchema";
import { toast } from "sonner";
import MainInfo from "./BOQ/MainInfo";
import ItemInfo from "./BOQ/ItemInfo";
import Attachments from "./BOQ/Attachments";
import ChangeHistory from "./BOQ/ChangeHistory";
import ApprovalHistory from "./BOQ/ApprovalHistory";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const Engineering = () => {
  const [selection, setSelection] = useState("main-info");
  const { id } = useParams();

  const handleClick = (value) => {
    setSelection(value);
  };

  const buttonOptions = [
    { label: "Main Info", value: "main-info" },
    { label: "Item Info", value: "item-info" },
    { label: "Attachment", value: "attachment" },
    { label: "Change History", value: "change-history" },
    { label: "Approval History", value: "approval-history" },
  ];

  return (
    <div className="w-full h-screen pt-[85px] px-2 md:px-8 py-10">
      <div className="flex md:flex-row items-center md:items-start w-full h-fit my-1">
        <Sidebar />
        <div className="w-full md:flex flex-wrap justify-center gap-1 hidden md:gap-10">
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

        <div className="md:hidden flex ml-auto ">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button className="bg-gray-100 hover:font-normal text-black border-2 hover:text-white">
                Sections{" "}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {buttonOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => handleClick(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Separator />
      <div className={`transition-container ${selection}`}>
        {selection === "main-info" && <MainInfo id={id} />}
        {selection === "item-info" && <ItemInfo id={id} />}
        {selection === "change-history" && <ChangeHistory id={id} />}
        {selection === "attachment" && <Attachments id={id} />}
        {selection === "approval-history" && <ApprovalHistory id={id} />}
      </div>
    </div>
  );
}

export default Engineering