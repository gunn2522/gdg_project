import { useState } from "react";
import { 
  Calendar, 
  CheckSquare, 
  Users, 
  BarChart3, 
  Bot, 
  Settings,
  Home,
  User,
  LogOut,
  Shield,
  Crown,
  UserCheck
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Events", url: "/events", icon: Calendar },
  { title: "Tasks", url: "/tasks", icon: CheckSquare },
  { title: "Attendance", url: "/attendance", icon: Users },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "AI Assistant", url: "/ai-assistant", icon: Bot },
];

const userItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { user, userRole, signOut } = useAuth();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-active" : "hover:bg-accent/50";

  const getRoleIcon = (role: string | null) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'member':
        return <Shield className="h-4 w-4 text-blue-500" />;
      case 'guest':
        return <UserCheck className="h-4 w-4 text-gray-500" />;
      default:
        return <UserCheck className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleBadgeVariant = (role: string | null) => {
    switch (role) {
      case 'admin':
        return 'default';
      case 'member':
        return 'secondary';
      case 'guest':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-72"}>
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">GDG</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-semibold text-sm">GDG Campus Events</span>
              <span className="text-xs text-muted-foreground">Event Management</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="flex-1 custom-scrollbar">
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border p-4">
        {user && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                  {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {user.user_metadata?.full_name || 'User'}
                  </p>
                  <div className="flex items-center gap-2">
                    {getRoleIcon(userRole)}
                    <Badge variant={getRoleBadgeVariant(userRole)} className="text-xs">
                      {userRole || 'guest'}
                    </Badge>
                  </div>
                </div>
              )}
            </div>
            {!collapsed && (
              <Button
                variant="ghost"
                size="sm"
                onClick={signOut}
                className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            )}
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}