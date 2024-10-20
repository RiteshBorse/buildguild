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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ActivityMainInfo from "./Activity/MainInfo";
import BOQMainInfo from "./BOQ/MainInfo";
import BOQItemInfo from "./BOQ/ItemInfo";
import BOQAttachments from "./BOQ/Attachments";
import BOQChangeHistory from "./BOQ/ChangeHistory";
import BOQApprovalHistory from "./BOQ/ApprovalHistory";
import WorkOrderMainInfo from "./WorkOrder/MainInfo";
import WorkOrderItemInfo from "./WorkOrder/ItemInfo";
import WorkOrderAttachments from "./WorkOrder/Attachments";
import WorkOrderChangeHistory from "./WorkOrder/ChangeHistory";
import WorkOrderApprovalHistory from "./WorkOrder/ApprovalHistory";
import WorkDoneMainInfo from "./WorkDone/MainInfo";
import WorkDoneItemInfo from "./WorkDone/ItemInfo";
import WorkDoneAttachments from "./WorkDone/Attachments";
import WorkDoneChangeHistory from "./WorkDone/ChangeHistory";
import WorkDoneApprovalHistory from "./WorkDone/ApprovalHistory.jsx";
import WorkDoneBillingTerm from "./WorkDone/BillingTerm"; 
import DPRMainInfo from "./DPR/MainInfo";
import DPRItemInfo from "./DPR/ItemInfo";
import DPRAttachments from "./DPR/Attachments";
import DPRChangeHistory from "./DPR/ChangeHistory";
import DPRApprovalHistory from "./DPR/ApprovalHistory";

// const Engineering = () => {
//   const [selection, setSelection] = useState("main-info");
//   const { id } = useParams();

//   const handleClick = (value) => {
//     setSelection(value);
//   };

//   const buttonOptions = [
//     { label: "Main Info", value: "main-info" },
//     { label: "Item Info", value: "item-info" },
//     { label: "Attachment", value: "attachment" },
//     { label: "Change History", value: "change-history" },
//     { label: "Approval History", value: "approval-history" },
//   ];

//   return (
//     <div className="w-full h-screen pt-[85px] px-2 md:px-8 py-10">
//       <div className="flex md:flex-row items-center md:items-start w-full h-fit my-1">
//         <Sidebar />
//         <div className="w-full md:flex flex-wrap justify-center gap-1 hidden md:gap-10">
//           {buttonOptions.map((option) => (
//             <Button
//               key={option.value}
//               variant="ghost"
//               className={`text-black ${
//                 selection === option.value ? "bg-gray-200" : ""
//               }`}
//               onClick={() => handleClick(option.value)}
//             >
//               {option.label}
//             </Button>
//           ))}
//         </div>

//         <div className="md:hidden flex ml-auto ">
//           <DropdownMenu>
//             <DropdownMenuTrigger>
//               <Button className="bg-gray-100 hover:font-normal text-black border-2 hover:text-white">
//                 Sections{" "}
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//               {buttonOptions.map((option) => (
//                 <DropdownMenuItem
//                   key={option.value}
//                   onClick={() => handleClick(option.value)}
//                 >
//                   {option.label}
//                 </DropdownMenuItem>
//               ))}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       <Separator />
//       <div className={`transition-container ${selection}`}>
//         {selection === "main-info" && <MainInfo id={id} />}
//         {selection === "item-info" && <ItemInfo id={id} />}
//         {selection === "change-history" && <ChangeHistory id={id} />}
//         {selection === "attachment" && <Attachments id={id} />}
//         {selection === "approval-history" && <ApprovalHistory id={id} />}
//       </div>
//     </div>
//   );
// }

const Engineering = () => {
  const [selection, setSelection] = useState("activity");
  const [subSection, setSubSection] = useState("main-info");
  const { id } = useParams();

  const handleClick = (value) => {
    setSelection(value);
    setSubSection("main-info"); // Reset to "main-info" when switching main sections
  };

  // Main buttons: Activity, BOQ, Work Order, Work Done, DPR
  const mainButtonOptions = [
    { label: "Activity", value: "activity" },
    { label: "BOQ", value: "boq" },
    { label: "Work Order", value: "work-order" },
    { label: "Work Done", value: "work-done" },
    { label: "DPR", value: "dpr" },
  ];

  // Subsections for each main section
  const getSubSections = () => {
    switch (selection) {
      case "activity":
        return [
          { label: "Main Info", value: "main-info" },
        ];
      case "boq":
        return [
          { label: "Main Info", value: "main-info" },
          { label: "Item Info", value: "item-info" },
          { label: "Attachment", value: "attachment" },
          { label: "Change History", value: "change-history" },
          { label: "Approval History", value: "approval-history" },
        ];
      case "work-order":
        return [
          { label: "Main Info", value: "main-info" },
          { label: "Item Info", value: "item-info" },
          { label: "Attachment", value: "attachment" },
          { label: "Change History", value: "change-history" },
          { label: "Approval History", value: "approval-history" },
        ];
      case "work-done":
        return [
          { label: "Main Info", value: "main-info" },
          { label: "Item Info", value: "item-info" },
          { label: "Billing Term", value: "billing-term" }, 
          { label: "Attachment", value: "attachment" },
          { label: "Change History", value: "change-history" },
          { label: "Approval History", value: "approval-history" },
        ];
      case "dpr":
        return [
          { label: "Main Info", value: "main-info" },
          { label: "Item Info", value: "item-info" },
          { label: "Attachment", value: "attachment" },
          { label: "Change History", value: "change-history" },
          { label: "Approval History", value: "approval-history" },
        ];
      default:
        return [];
    }
  };

  // Dynamically import and render different components for each main section's subsections
  const renderSubSection = () => {
    const subSections = getSubSections();

    const getComponentForSubSection = () => {
      switch (selection) {
        case "activity":
          switch (subSection) {
            case "main-info":
              return <ActivityMainInfo id={id} />;
            default:
              return null;
          }
        case "boq":
          switch (subSection) {
            case "main-info":
              return <BOQMainInfo id={id} />;
            case "item-info":
              return <BOQItemInfo id={id} />;
            case "attachment":
              return <BOQAttachments id={id} />;
            case "change-history":
              return <BOQChangeHistory id={id} />;
            case "approval-history":
              return <BOQApprovalHistory id={id} />;
            default:
              return null;
          }
        case "work-order":
          switch (subSection) {
            case "main-info":
              return <WorkOrderMainInfo id={id} />;
            case "item-info":
              return <WorkOrderItemInfo id={id} />;
            case "attachment":
              return <WorkOrderAttachments id={id} />;
            case "change-history":
              return <WorkOrderChangeHistory id={id} />;
            case "approval-history":
              return <WorkOrderApprovalHistory id={id} />;
            default:
              return null;
          }
        case "work-done":
          switch (subSection) {
            case "main-info":
              return <WorkDoneMainInfo id={id} />;
            case "billing-term":
              return <WorkDoneBillingTerm id={id} />; 
            case "item-info":
              return <WorkDoneItemInfo id={id} />;
            case "attachment":
              return <WorkDoneAttachments id={id} />;
            case "change-history":
              return <WorkDoneChangeHistory id={id} />;
            case "approval-history":
              return <WorkDoneApprovalHistory id={id} />;
            default:
              return null;
          }
        case "dpr":
          switch (subSection) {
            case "main-info":
              return <DPRMainInfo id={id} />;
            case "item-info":
              return <DPRItemInfo id={id} />;
            case "attachment":
              return <DPRAttachments id={id} />;
            case "change-history":
              return <DPRChangeHistory id={id} />;
            case "approval-history":
              return <DPRApprovalHistory id={id} />;
            default:
              return null;
          }
        default:
          return null;
      }
    };

    return (
      <>
        <div className="flex gap-5 justify-center mb-2">
          {subSections.map((sub) => (
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

        {/* Render the appropriate subsection component */}
        {getComponentForSubSection()}
      </>
    );
  };

  return (
    <div className="w-full h-screen pt-[85px] px-2 md:px-8 py-10">
      <div className="flex md:flex-row items-center md:items-start w-full h-fit my-1">
        <Sidebar />
        <div className="w-full md:flex flex-wrap justify-center gap-1 hidden md:gap-10">
          {mainButtonOptions.map((option) => (
            <Button
              key={option.value}
              variant="ghost"
              className={`text-black ${selection === option.value ? "bg-gray-400" : ""}`}
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
                Sections
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {mainButtonOptions.map((option) => (
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

      <div className="mt-4">{renderSubSection()}</div>
    </div>
  );
};





export default Engineering