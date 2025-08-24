
"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { Rocket, RefreshCw, Search, Eye, Edit, KeyRound, Banknote, CreditCard, Lock, FileText, Trash2 } from "lucide-react";
import Image from "next/image";

const managementData = [
    { id: '1007', name: '雲雀恭子', phone: '00425409066', amount: '¥500,000', creditScore: 500, dateApproved: '8/19/2025, 9:29:53 AM' },
    { id: '1008', name: '雲雀恭子', phone: '0425409066', amount: '¥500,000', creditScore: 500, dateApproved: '8/19/2025, 9:29:48 AM' },
    { id: '1009', name: '荒木弘', phone: '0423374488', amount: '¥0', creditScore: 400, dateApproved: '8/18/2025, 9:03:17 AM' },
    { id: '1006', name: '原正弘', phone: '0569559921', amount: '¥500,000', creditScore: 500, dateApproved: '8/13/2025, 12:20:55 PM' },
    { id: '996', name: 'Andreas Rudi Schmetzer', phone: '00491723789846', amount: '¥250,000', creditScore: 500, dateApproved: '8/9/2025, 1:16:15 PM' },
    { id: '1001', name: '5555555555', phone: '5555555555', amount: '¥52,500', creditScore: 400, dateApproved: '8/7/2025, 3:45:49 PM' },
];


export default function ManagementInfoPage() {

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar activePage="management-info" />
      <div className="flex flex-col w-full">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Rocket className="h-6 w-6 text-primary" />
                    <CardTitle className="text-2xl font-bold">Management Information</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-center gap-4">
                <Input placeholder="Search Name..." className="max-w-xs" />
                <Input placeholder="Search Phone..." className="max-w-xs" />
                <Button>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                </Button>
                <Button variant="outline">
                    <RefreshCw className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50 hover:bg-muted/50">
                        <TableHead>Loan ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Credit Score</TableHead>
                        <TableHead>Date Approved</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {managementData.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>{item.amount}</TableCell>
                                <TableCell>{item.creditScore}</TableCell>
                                <TableCell>{item.dateApproved}</TableCell>
                                <TableCell className="flex gap-2 flex-wrap max-w-sm">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white"><KeyRound className="mr-1" /> Modify OTP</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Modify Otp For {item.name}</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <Input placeholder="Enter new OTP" />
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <DialogClose asChild>
                                                    <Button>Save</Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>

                                    <Button size="sm"><Eye className="mr-1" /> View Profile</Button>
                                    <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white"><Edit className="mr-1" /> Modify Status</Button>
                                    <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white"><CreditCard className="mr-1" /> Modify Bank</Button>
                                    <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white"><CreditCard className="mr-1" /> Modify Credit Score</Button>
                                    <Button size="sm" variant="destructive"><Lock className="mr-1" /> Modify Password</Button>
                                    <Button size="sm"><Banknote className="mr-1" /> Modify Amount</Button>
                                    <Button size="sm" className="bg-slate-600 hover:bg-slate-700 text-white"><FileText className="mr-1" /> Clear Withdraw | Status</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
