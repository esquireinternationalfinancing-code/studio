
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
import { Rocket, RefreshCw, Search, Eye, Edit, KeyRound, Banknote, CreditCard, Lock, FileText, Trash2, User } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const managementData = [
    { 
        id: '1007', 
        name: '雲雀恭子', 
        phone: '00425409066', 
        amount: '¥500,000', 
        creditScore: 500, 
        dateApproved: '8/19/2025, 9:29:53 AM',
        idNumber: '448108318440',
        address: '立川市富士見町5-14-7',
        companyName: 'ケアレジデンス立川',
        position: '介護士',
        income: '¥270,000',
        monthlyExpense: '¥310,000',
        bankName: 'みずほ銀行 調布支店',
        accountNumber: '8104188',
        loanPeriod: 24,
        monthlyPayment: '¥26,435.55',
        createdAt: '8/17/2025, 7:22:33 PM',
        approvedBy: 'Admin',
    },
    { 
        id: '1008', 
        name: '雲雀恭子', 
        phone: '0425409066', 
        amount: '¥500,000', 
        creditScore: 500, 
        dateApproved: '8/19/2025, 9:29:48 AM',
        idNumber: '448108318440',
        address: '立川市富士見町5-14-7',
        companyName: 'ケアレジデンス立川',
        position: '介護士',
        income: '¥270,000',
        monthlyExpense: '¥310,000',
        bankName: 'みずほ銀行 調布支店',
        accountNumber: '8104188',
        loanPeriod: 24,
        monthlyPayment: '¥26,435.55',
        createdAt: '8/17/2025, 7:22:33 PM',
        approvedBy: 'Admin',
    },
    { 
        id: '1009', 
        name: '荒木弘', 
        phone: '0423374488', 
        amount: '¥0', 
        creditScore: 400, 
        dateApproved: '8/18/2025, 9:03:17 AM',
        idNumber: '448108318440',
        address: '立川市富士見町5-14-7',
        companyName: 'ケアレジデンス立川',
        position: '介護士',
        income: '¥270,000',
        monthlyExpense: '¥310,000',
        bankName: 'みずほ銀行 調布支店',
        accountNumber: '8104188',
        loanPeriod: 24,
        monthlyPayment: '¥26,435.55',
        createdAt: '8/17/2025, 7:22:33 PM',
        approvedBy: 'Admin',
    },
    { 
        id: '1006', 
        name: '原正弘', 
        phone: '0569559921', 
        amount: '¥500,000', 
        creditScore: 500, 
        dateApproved: '8/13/2025, 12:20:55 PM',
        idNumber: '448108318440',
        address: '立川市富士見町5-14-7',
        companyName: 'ケアレジデンス立川',
        position: '介護士',
        income: '¥270,000',
        monthlyExpense: '¥310,000',
        bankName: 'みずほ銀行 調布支店',
        accountNumber: '8104188',
        loanPeriod: 24,
        monthlyPayment: '¥26,435.55',
        createdAt: '8/17/2025, 7:22:33 PM',
        approvedBy: 'Admin',
    },
    { 
        id: '996', 
        name: 'Andreas Rudi Schmetzer', 
        phone: '00491723789846', 
        amount: '¥250,000', 
        creditScore: 500, 
        dateApproved: '8/9/2025, 1:16:15 PM',
        idNumber: '448108318440',
        address: '立川市富士見町5-14-7',
        companyName: 'ケアレジデンス立川',
        position: '介護士',
        income: '¥270,000',
        monthlyExpense: '¥310,000',
        bankName: 'みずほ銀行 調布支店',
        accountNumber: '8104188',
        loanPeriod: 24,
        monthlyPayment: '¥26,435.55',
        createdAt: '8/17/2025, 7:22:33 PM',
        approvedBy: 'Admin',
    },
    { 
        id: '1001', 
        name: '5555555555', 
        phone: '5555555555', 
        amount: '¥52,500', 
        creditScore: 400, 
        dateApproved: '8/7/2025, 3:45:49 PM',
        idNumber: '448108318440',
        address: '立川市富士見町5-14-7',
        companyName: 'ケアレジデンス立川',
        position: '介護士',
        income: '¥270,000',
        monthlyExpense: '¥310,000',
        bankName: 'みずほ銀行 調布支店',
        accountNumber: '8104188',
        loanPeriod: 24,
        monthlyPayment: '¥26,435.55',
        createdAt: '8/17/2025, 7:22:33 PM',
        approvedBy: 'Admin',
    },
];


const UserProfileDetail = ({ label, value }: { label: string, value: string | number | undefined }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-semibold">{value}</p>
    </div>
);

const ModifyStatusDialogContent = ({ name }: { name: string }) => {
  const [status, setStatus] = useState("Approved");
  const [message, setMessage] = useState("Congratulations, Your loan has been approved. Contact our finance to obtain OTP code");

  const handleCheckboxChange = (checked: boolean | 'indeterminate', type: string) => {
    if (checked) {
        switch (type) {
            case 'pending':
                setStatus("Pending");
                setMessage("Your loan application is currently pending review.");
                break;
            case 'bank-incorrect':
                setStatus("Bank Information Incorrect");
                setMessage("There appears to be an issue with the bank information you provided. Please review and update your details to proceed.");
                break;
            default:
                break;
        }
    } else {
      setStatus("Approved");
      setMessage("Congratulations, Your loan has been approved. Contact our finance to obtain OTP code");
    }
  };

  return (
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Modify Loan Status & Notify Message for {name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <Input value={status} onChange={(e) => setStatus(e.target.value)} />
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Checkbox id={`pending-${name}`} onCheckedChange={(checked) => handleCheckboxChange(checked, 'pending')} />
                    <Label htmlFor={`pending-${name}`}>Pending</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id={`bank-incorrect-${name}`} onCheckedChange={(checked) => handleCheckboxChange(checked, 'bank-incorrect')} />
                    <Label htmlFor={`bank-incorrect-${name}`}>Bank Information Incorrect</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id={`invalid-amount-${name}`} />
                    <Label htmlFor={`invalid-amount-${name}`}>Withdraw Invalid Amount</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id={`confirm-otp-${name}`} />
                    <Label htmlFor={`confirm-otp-${name}`}>Confirm New OTP</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id={`insufficient-credit-${name}`} />
                    <Label htmlFor={`insufficient-credit-${name}`}>Insufficient Credit Score</Label>
                </div>
            </div>
        </div>
        <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">Save</Button>
            </DialogClose>
        </DialogFooter>
    </DialogContent>
  );
};


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

                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="sm"><Eye className="mr-1" /> View Profile</Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-4xl">
                                            <DialogHeader>
                                                <DialogTitle className="flex items-center gap-2">
                                                    <User className="h-6 w-6" />
                                                    User Profile
                                                </DialogTitle>
                                            </DialogHeader>
                                            <div className="grid grid-cols-2 gap-x-8 gap-y-4 p-4 max-h-[70vh] overflow-y-auto">
                                                <UserProfileDetail label="Full Name" value={item.name} />
                                                <UserProfileDetail label="Id Number" value={item.idNumber} />
                                                <UserProfileDetail label="Phone" value={item.phone} />
                                                <UserProfileDetail label="Address" value={item.address} />
                                                <UserProfileDetail label="Company Name" value={item.companyName} />
                                                <UserProfileDetail label="Position" value={item.position} />
                                                <UserProfileDetail label="Income" value={item.income} />
                                                <UserProfileDetail label="Monthly Expense" value={item.monthlyExpense} />
                                                <UserProfileDetail label="Bank Name" value={item.bankName} />
                                                <UserProfileDetail label="Account Number" value={item.accountNumber} />
                                                <UserProfileDetail label="Loan Amount" value={item.amount} />
                                                <UserProfileDetail label="Loan Period" value={item.loanPeriod} />
                                                <UserProfileDetail label="Monthly Payment" value={item.monthlyPayment} />
                                                <UserProfileDetail label="Created At" value={item.createdAt} />
                                                <UserProfileDetail label="Approved Date" value={item.dateApproved} />
                                                <UserProfileDetail label="Approved By" value={item.approvedBy} />
                                                <UserProfileDetail label="Credit Score" value={item.creditScore} />
                                                
                                                <div className="col-span-1 mt-4">
                                                    <h3 className="font-semibold mb-2 text-sm text-muted-foreground">Front ID:</h3>
                                                    <Image src="https://placehold.co/400x250.png" alt="Front ID" width={400} height={250} className="rounded-md w-full" data-ai-hint="id card" />
                                                </div>
                                                <div className="col-span-1 mt-4">
                                                    <h3 className="font-semibold mb-2 text-sm text-muted-foreground">Back ID:</h3>
                                                    <Image src="https://placehold.co/400x250.png" alt="Back ID" width={400} height={250} className="rounded-md w-full" data-ai-hint="id card back" />
                                                </div>
                                                <div className="col-span-1 mt-4">
                                                    <h3 className="font-semibold mb-2 text-sm text-muted-foreground">Selfie with ID:</h3>
                                                    <Image src="https://placehold.co/400x250.png" alt="Selfie with ID" width={400} height={250} className="rounded-md w-full" data-ai-hint="person selfie" />
                                                </div>
                                                <div className="col-span-1 mt-4">
                                                    <h3 className="font-semibold mb-2 text-sm text-muted-foreground">Signature:</h3>
                                                    <div className="border rounded-md h-full flex items-center justify-center bg-gray-100">
                                                       <Image src="https://placehold.co/200x100.png" alt="Signature" width={200} height={100} data-ai-hint="signature" />
                                                    </div>
                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline">Close</Button>
                                                </DialogClose>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    
                                    <Dialog>
                                        <DialogTrigger asChild>
                                           <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white"><Edit className="mr-1" /> Modify Status</Button>
                                        </DialogTrigger>
                                        <ModifyStatusDialogContent name={item.name} />
                                    </Dialog>

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

    