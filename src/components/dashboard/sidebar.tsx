"use client";
import { useState } from "react";
import {
  Bell,
  Home,
  User,
  Clock,
  CheckCircle,
  FileText,
  CreditCard,
  LogOut,
  Moon,
  Sun,
  Shield,
  Frown, // Using Frown for "Killer Panel", can be replaced
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function DashboardSidebar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="flex flex-col w-64 bg-card border-r h-screen sticky top-0">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-md">
                <Shield size={24}/>
            </div>
            <h1 className="text-xl font-bold">Loan App</h1>
        </div>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-4">
        <Button
          onClick={toggleDarkMode}
          variant="outline"
          className="w-full justify-start"
        >
          {isDarkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </Button>
      </div>
      <div className="p-4 flex items-center gap-3 border-t border-b">
        <Avatar>
          <AvatarImage src="https://placehold.co/40x40.png" alt="Admin" data-ai-hint="person portrait" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">Admin</p>
          <p className="text-sm text-muted-foreground">Admin</p>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <Button variant="default" className="w-full justify-start bg-primary text-primary-foreground">
          <Home className="mr-2 h-4 w-4" />
          Home Page
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <User className="mr-2 h-4 w-4" />
          Administrator
        </Button>
        <div>
          <h3 className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider my-2">Admin Panel</h3>
          <Button variant="ghost" className="w-full justify-start">
            <Clock className="mr-2 h-4 w-4" />
            Pending Lists
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <CheckCircle className="mr-2 h-4 w-4" />
            Approved Lists
          </Button>
        </div>
        <div>
          <h3 className="px-4 text-xs font-semibold text-accent my-2 uppercase tracking-wider">Killer Panel</h3>
          <Button variant="ghost" className="w-full justify-start">
            <FileText className="mr-2 h-4 w-4" />
            Management Info
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <CreditCard className="mr-2 h-4 w-4" />
            Withdrawal Detail
          </Button>
        </div>
      </nav>
      <div className="p-4 mt-auto border-t">
        <Button variant="destructive" className="w-full">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
