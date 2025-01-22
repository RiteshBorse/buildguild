import {
  Menu,
  Package,
  User2,
  Workflow,
  BarChart3
} from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FaMoneyBill } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuValue, setMenuValue] = useState("");

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuItems = [
    { value: 'administration', icon: User2, label: 'Administration' },
    { value: 'engineering', icon: Workflow, label: 'Engineering' },
    { value: 'materials', icon: Package, label: 'Materials' },
    { value: 'financials', icon: FaMoneyBill, label: 'Financials' },
    { value: 'analysis', icon: BarChart3, label: 'Analysis' }
  ];

  const onClickMenuItems = (value) => {
    setMenuValue(value);
    handleMenu();
    if (id) {
      navigate(`/${value}/${id}`);
    } else {
      console.warn('No ID available in URL parameters');
    }
  };
  useEffect(() => {
    const path = window.location.pathname;
    const currentSection = menuItems.find(item => path.includes(item.value));
    if (currentSection) {
      setMenuValue(currentSection.value);
    }
  }, []);

  return (
    <div>
      <Menu onClick={handleMenu} />
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left">
          <SheetHeader className="flex flex-col mx-auto items-center justify-center w-full my-10 gap-5">
            <SheetTitle className="text-3xl">Dashboard</SheetTitle>
            <SheetDescription className="w-2/3 flex flex-col gap-4">
              {menuItems.map(({ value, icon: Icon, label }) => (
                <div
                  key={value}
                  className={`flex items-center justify-start px-3 gap-2 shadow-sm py-2 border 
                    hover:bg-gray-300 hover:text-black rounded-sm cursor-pointer
                    ${menuValue === value ? 'bg-gray-200' : ''}`}
                  onClick={() => onClickMenuItems(value)}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <p>{label}</p>
                </div>
              ))}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Sidebar;