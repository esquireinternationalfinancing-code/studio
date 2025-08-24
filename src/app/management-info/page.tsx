
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
import { Rocket, RefreshCw, Search, Eye, Edit, KeyRound, Banknote, CreditCard, Lock, FileText, User } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Loan } from "@/services/api";
import { getLoans, updateLoan } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const UserProfileDetail = ({ label, value }: { label: string, value: string | number | undefined }) => (
    <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-semibold">{value ?? 'N/A'}</p>
    </div>
);

const ModifyStatusDialogContent = ({ loan, onClose }: { loan: Loan, onClose: () => void }) => {
  const [status, setStatus] = useState(loan.status ?? "Approved");
  const [message, setMessage] = useState("Congratulations, Your loan has been approved. Contact our finance to obtain OTP code");
  const { toast } = useToast();

  const handleCheckboxChange = (checked: boolean | 'indeterminate', type: string) => {
    let newStatus = "Approved";
    let newMessage = "Congratulations, Your loan has been approved. Contact our finance to obtain OTP code";

    if (checked) {
        switch (type) {
            case 'pending':
                newStatus = "Pending";
                newMessage = "Your loan application is currently pending review.";
                break;
            case 'bank-incorrect':
                newStatus = "Bank Information Incorrect";
                newMessage = "There appears to be an issue with the bank information you provided. Please review and update your details to proceed.";
                break;
            case 'invalid-amount':
                newStatus = "Withdraw Invalid Amount";
                newMessage = "The withdrawal amount requested is invalid. Please check the amount and try again.";
                break;
            case 'confirm-otp':
                newStatus = "Confirm New OTP";
                newMessage = "A new OTP has been generated. Please use this to confirm your transaction.";
                break;
            case 'insufficient-credit':
                newStatus = "Insufficient Credit Score";
                newMessage = "Your loan could not be processed due to an insufficient credit score. Please contact us for more details.";
                break;
            default:
                break;
        }
    }
    setStatus(newStatus);
    setMessage(newMessage);
  };
  
  const handleSave = async () => {
    await updateLoan(loan.id, { status });
    toast({ title: "Status Updated", description: `Status for ${loan.name} updated to ${status}.`});
    onClose();
  };

  return (
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Modify Loan Status &amp; Notify Message for {loan.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <Input value={status} onChange={(e) => setStatus(e.target.value)} />
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} />
            <div className="space-y-2">
                <div className="flex items-center space-x-2">
                    <Checkbox id={`pending-${loan.id}`} onCheckedChange={(checked) => handleCheckboxChange(checked, 'pending')} />
                    <Label htmlFor={`pending-${loan.id}`}>Pending</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id={`bank-incorrect-${loan.id}`} onCheckedChange={(checked) => handleCheckboxChange(checked, 'bank-incorrect')} />
                    <Label htmlFor={`bank-incorrect-${loan.id}`}>Bank Information Incorrect</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id={`invalid-amount-${loan.id}`} onCheckedChange={(checked) => handleCheckboxChange(checked, 'invalid-amount')} />
                    <Label htmlFor={`invalid-amount-${loan.id}`}>Withdraw Invalid Amount</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id={`confirm-otp-${loan.id}`} onCheckedChange={(checked) => handleCheckboxChange(checked, 'confirm-otp')} />
                    <Label htmlFor={`confirm-otp-${loan.id}`}>Confirm New OTP</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox id={`insufficient-credit-${loan.id}`} onCheckedChange={(checked) => handleCheckboxChange(checked, 'insufficient-credit')} />
                    <Label htmlFor={`insufficient-credit-${loan.id}`}>Insufficient Credit Score</Label>
                </div>
            </div>
        </div>
        <DialogFooter>
            <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave} className="bg-yellow-500 hover:bg-yellow-600 text-white">Save</Button>
        </DialogFooter>
    </DialogContent>
  );
};

export default function ManagementInfoPage() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  const [dialogsOpen, setDialogsOpen] = useState<Record<string, boolean>>({});

  const setDialogOpen = (loanId: string, dialog: string, open: boolean) => {
    setDialogsOpen(prev => ({ ...prev, [`${loanId}-${dialog}`]: open }));
  };

  const isDialogOpen = (loanId: string, dialog: string) => {
    return dialogsOpen[`${loanId}-${dialog}`] ?? false;
  };
  
  const fetchData = async () => {
      setIsLoading(true);
      const data = await getLoans();
      setLoans(data);
      setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const handleGenericSave = async (loanId: string, field: keyof Loan, value: any, dialog: string) => {
    await updateLoan(loanId, { [field]: value });
    toast({ title: "Success", description: `User information has been updated.`});
    setDialogOpen(loanId, dialog, false);
    fetchData(); // Refresh data
  };


  const filteredLoans = loans.filter(loan =>
    loan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.phone.includes(searchTerm)
  );

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
                <Input 
                  placeholder="Search Name or Phone..." 
                  className="max-w-xs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={() => setSearchTerm('')}>
                    <Search className="mr-2 h-4 w-4" />
                    Search
                </Button>
                <Button variant="outline" onClick={fetchData}>
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
                        {isLoading ? (
                            <TableRow><TableCell colSpan={7} className="text-center">Loading...</TableCell></TableRow>
                        ) : filteredLoans.length > 0 ? (
                            filteredLoans.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>{item.amount}</TableCell>
                                <TableCell>{item.creditScore}</TableCell>
                                <TableCell>{item.dateApproved}</TableCell>
                                <TableCell className="flex gap-2 flex-wrap max-w-sm">
                                    <Dialog open={isDialogOpen(item.id, 'otp')} onOpenChange={(open) => setDialogOpen(item.id, 'otp', open)}>
                                        <DialogTrigger asChild>
                                            <Button size="sm" className="bg-orange-500 hover:bg-orange-600 text-white"><KeyRound className="mr-1" /> Modify OTP</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Modify Otp For {item.name}</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <Input id={`otp-${item.id}`} placeholder="Enter new OTP" />
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <Button onClick={() => handleGenericSave(item.id, 'otp', (document.getElementById(`otp-${item.id}`) as HTMLInputElement).value, 'otp')}>Save</Button>
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
                                    
                                    <Dialog open={isDialogOpen(item.id, 'status')} onOpenChange={(open) => setDialogOpen(item.id, 'status', open)}>
                                        <DialogTrigger asChild>
                                           <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white"><Edit className="mr-1" /> Modify Status</Button>
                                        </DialogTrigger>
                                        <ModifyStatusDialogContent loan={item} onClose={() => {setDialogOpen(item.id, 'status', false); fetchData();}} />
                                    </Dialog>

                                    <Dialog open={isDialogOpen(item.id, 'bank')} onOpenChange={(open) => setDialogOpen(item.id, 'bank', open)}>
                                        <DialogTrigger asChild>
                                            <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white"><CreditCard className="mr-1" /> Modify Bank</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Modify Bank Info for {item.name}</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <Input id={`bankName-${item.id}`} placeholder="Bank Name" defaultValue={item.bankName}/>
                                                <Input id={`accountNumber-${item.id}`} placeholder="Account Number" defaultValue={item.accountNumber} />
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <Button 
                                                    onClick={() => {
                                                        const bankName = (document.getElementById(`bankName-${item.id}`) as HTMLInputElement).value;
                                                        const accountNumber = (document.getElementById(`accountNumber-${item.id}`) as HTMLInputElement).value;
                                                        handleGenericSave(item.id, 'bankName', bankName, 'bank');
                                                        handleGenericSave(item.id, 'accountNumber', accountNumber, 'bank');
                                                    }} 
                                                    className="bg-green-500 hover:bg-green-600 text-white">
                                                    Save Bank Info
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                     <Dialog open={isDialogOpen(item.id, 'credit')} onOpenChange={(open) => setDialogOpen(item.id, 'credit', open)}>
                                        <DialogTrigger asChild>
                                            <Button size="sm" className="bg-purple-500 hover:bg-purple-600 text-white"><CreditCard className="mr-1" /> Modify Credit Score</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Modify Credit For {item.name}</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <Input id={`creditScore-${item.id}`} type="number" defaultValue={item.creditScore} />
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <Button onClick={() => handleGenericSave(item.id, 'creditScore', parseInt((document.getElementById(`creditScore-${item.id}`) as HTMLInputElement).value), 'credit')}>Save</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog open={isDialogOpen(item.id, 'password')} onOpenChange={(open) => setDialogOpen(item.id, 'password', open)}>
                                        <DialogTrigger asChild>
                                            <Button size="sm" variant="destructive"><Lock className="mr-1" /> Modify Password</Button>
                                        </DialogTrigger>
                                         <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Modify Password For {item.name}</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <Input id={`password-${item.id}`} type="password" placeholder="Enter new password" />
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <Button onClick={() => handleGenericSave(item.id, 'password', (document.getElementById(`password-${item.id}`) as HTMLInputElement).value, 'password')}>Save</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <Dialog open={isDialogOpen(item.id, 'amount')} onOpenChange={(open) => setDialogOpen(item.id, 'amount', open)}>
                                        <DialogTrigger asChild>
                                            <Button size="sm"><Banknote className="mr-1" /> Modify Amount</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Modify Amount For {item.name}</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-4 py-4">
                                                <Input id={`amount-${item.id}`} defaultValue={item.amount} />
                                            </div>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <Button onClick={() => handleGenericSave(item.id, 'amount', (document.getElementById(`amount-${item.id}`) as HTMLInputElement).value, 'amount')}>Save</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                    <Button size="sm" className="bg-slate-600 hover:bg-slate-700 text-white"><FileText className="mr-1" /> Clear Withdraw | Status</Button>
                                </TableCell>
                            </TableRow>
                        ))
                        ) : (
                             <TableRow><TableCell colSpan={7} className="text-center">No users found.</TableCell></TableRow>
                        )}
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

    