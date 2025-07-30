import { Bell, Search, Menu, Sun, Moon, Plus } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";

interface TopBarProps {
  title: string;
  showSearch?: boolean;
  actions?: React.ReactNode;
}

export function TopBar({ title, showSearch = true, actions }: TopBarProps) {
  const { setTheme, theme } = useTheme();
  const { userRole } = useAuth();

  const canCreateEvents = userRole === 'admin' || userRole === 'member';

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-full items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">{title}</h1>
            <p className="text-xs text-muted-foreground">GDG Campus Events</p>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          {showSearch && (
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] lg:w-[300px] pl-8"
              />
            </div>
          )}

          {canCreateEvents && (
            <Sheet>
              <SheetTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Quick Create</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Quick Create</SheetTitle>
                  <SheetDescription>
                    Quickly create new events, tasks, or manage attendance.
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <Button variant="outline" className="justify-start gap-2">
                    <Plus className="h-4 w-4" />
                    New Event
                  </Button>
                  <Button variant="outline" className="justify-start gap-2">
                    <Plus className="h-4 w-4" />
                    New Task
                  </Button>
                  <Button variant="outline" className="justify-start gap-2">
                    <Plus className="h-4 w-4" />
                    Record Attendance
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          )}

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 text-xs"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between p-2">
                <h3 className="font-semibold">Notifications</h3>
                <Button variant="ghost" size="sm">
                  Mark all read
                </Button>
              </div>
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">New event created</p>
                  <p className="text-xs text-muted-foreground">
                    React Workshop has been scheduled for tomorrow
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Task assigned</p>
                  <p className="text-xs text-muted-foreground">
                    You have been assigned to setup venue
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Event reminder</p>
                  <p className="text-xs text-muted-foreground">
                    Android Study Jam starts in 1 hour
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {actions}
        </div>
      </div>
    </header>
  );
}