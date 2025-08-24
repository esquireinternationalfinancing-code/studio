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
  Frown, // Using Frown for "Killer Panel", can be replaced
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const CustomIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-6 w-6"
    >
        <path d="M6 14.5c0 .83.67 1.5 1.5 1.5h1c.83 0 1.5-.67 1.5-1.5v-5c0-.83-.67-1.5-1.5-1.5h-1c-.83 0-1.5.67-1.5 1.5v5zm4.5-7c0 .83.67 1.5 1.5 1.5h1c.83 0 1.5-.67 1.5-1.5v-2c0-.83-.67-1.5-1.5-1.5h-1c-.83 0-1.5.67-1.5 1.5v2zm4.5 2c0 .83.67 1.5 1.5 1.5h1c.83 0 1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5h-1c-.83 0-1.5.67-1.5 1.5v7z" />
        <path d="M21.71,11.29l-1.42,1.42C19.53,12.95,18.82,13,18,13H6c-2.76,0-5,2.24-5,5s2.24,5,5,5h12c.82,0,1.53-.47,1.95-1.29l1.42-1.42c.39-.39.39-1.02,0-1.41l-2.83-2.83c-.39-.39-1.02-.39-1.41,0s-.39,1.02,0,1.41l2.12,2.12c-.1.21-.3.39-.55.5h-12c-1.65,0-3-1.35-3-3s1.35-3,3-3h12c.26,0,.45.18.55.38l-2.12-2.12c-.39-.39-.39-1.02,0-1.41s1.02-.39,1.41,0l2.83,2.83c.4,.38.4,1.02,0,1.41z" />
    </svg>
);


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
                <CustomIcon />
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
