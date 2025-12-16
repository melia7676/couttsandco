import { Link, useLocation } from "react-router-dom";
import { LucideIcon, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarNavLinkProps {
  path: string;
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
}

export function SidebarNavLink({ path, label, icon: Icon, onClick }: SidebarNavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === path || 
    (path === "/dashboard" && location.pathname === "/");

  return (
    <Link
      to={path}
      onClick={onClick}
      className={cn("nav-link", isActive && "active")}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
      {isActive && <ChevronRight className="h-4 w-4 ml-auto" />}
    </Link>
  );
}
