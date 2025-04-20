
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  User, 
  Calendar, 
  FileText, 
  FileCheck, 
  DollarSign, 
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { signOut } = useAuth();

  const toggleSidebar = () => setCollapsed(!collapsed);

  const navItems = [
    { 
      name: "Dashboard", 
      path: "/dashboard", 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      name: "Patients", 
      path: "/patients", 
      icon: <User className="h-5 w-5" /> 
    },
    { 
      name: "Appointments", 
      path: "/appointments", 
      icon: <Calendar className="h-5 w-5" /> 
    },
    { 
      name: "Prescriptions", 
      path: "/prescriptions", 
      icon: <FileCheck className="h-5 w-5" /> 
    },
    { 
      name: "Payments", 
      path: "/payments", 
      icon: <DollarSign className="h-5 w-5" /> 
    },
  ];

  return (
    <aside 
      className={cn(
        "bg-sidebar flex flex-col transition-all duration-300 ease-in-out z-20",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 bg-sidebar-accent">
        {!collapsed && (
          <h1 className="text-xl font-bold text-white">OrthoClinic</h1>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="text-white hover:bg-sidebar-accent/50"
        >
          {collapsed ? <Menu /> : <X />}
        </Button>
      </div>

      <nav className="flex-1 pt-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent/40 transition-colors",
                  isActive ? "bg-sidebar-accent text-white" : "text-sidebar-foreground",
                  collapsed && "justify-center"
                )}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-clinic-400 flex items-center justify-center text-white">
            D
          </div>
          {!collapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Dr. Smith</p>
              <p className="text-xs text-slate-300">Admin</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
