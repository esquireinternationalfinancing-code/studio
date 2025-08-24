
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
import { Badge } from "@/components/ui/badge";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { Clock, RefreshCw, Search, Eye, Edit, Check, X } from "lucide-react";
import Image from "next/image";
import type { Loan } from "@/services/api";
import { getLoans, updateLoan } from "@/services/api";
import { useToast } from "@/hooks/use-toast";


export default function PendingLoansPage() {
  const [pendingLoans, setPendingLoans] = useState<Loan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const fetchData = async () => {
    setIsLoading(true);
    const allLoans = await getLoans();
    const pending = allLoans.filter(loan => loan.status === 'Pending');
    setPendingLoans(pending);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleLoanAction = async (loanId: string, newStatus: 'Approved' | 'Rejected') => {
    try {
        const loanToMove = pendingLoans.find(loan => loan.id === loanId);
        if (!loanToMove) return;

        const updateData: Partial<Loan> = { status: newStatus };
        if (newStatus === 'Rejected') {
            // In a real app, you might want specific fields for rejection dates/reasons.
        } else if (newStatus === 'Approved') {
            (updateData as any).dateApproved = new Date().toLocaleString();
            (updateData as any).approvedBy = 'Admin';
        }
        
        await updateLoan(loanId, updateData);

        toast({
            title: `Loan ${newStatus}`,
            description: `Loan ID ${loanId} has been successfully ${newStatus.toLowerCase()}.`
        });

        fetchData(); // Refresh the list from the API
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Update Failed",
            description: `Could not update loan ${loanId}. Please try again.`
        });
        console.error(`Failed to update loan ${loanId}:`, error);
    }
  };
  
  const filteredLoans = pendingLoans.filter(loan =>
    loan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.phone.includes(searchTerm)
  );


  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar activePage="pending-loans" />
      <div className="flex flex-col w-full">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Clock className="h-6 w-6 text-yellow-600" />
                    <CardTitle className="text-2xl font-bold">Pending Loan List</CardTitle>
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
                      <TableRow className="bg-yellow-100 hover:bg-yellow-100/80">
                        <TableHead>Loan ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Term</TableHead>
                        <TableHead>Requested At</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow><TableCell colSpan={8} className="text-center">Loading...</TableCell></TableRow>
                        ) : filteredLoans.length > 0 ? (
                            filteredLoans.map((loan) => (
                                <TableRow key={loan.id}>
                                    <TableCell>{loan.id}</TableCell>
                                    <TableCell>{loan.name}</TableCell>
                                    <TableCell>{loan.phone}</TableCell>
                                    <TableCell>{loan.amount}</TableCell>
                                    <TableCell>{loan.loanPeriod}</TableCell>
                                    <TableCell>{loan.createdAt}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">{loan.status}</Badge>
                                    </TableCell>
                                    <TableCell className="flex gap-2 flex-wrap">
                                        <Dialog>
                                          <DialogTrigger asChild>
                                            <Button size="sm" variant="default">
                                                <Eye className="mr-1 h-4 w-4" />
                                                View Profile
                                            </Button>
                                          </DialogTrigger>
                                          <DialogContent className="max-w-3xl">
                                            <DialogHeader>
                                              <DialogTitle>User Documents</DialogTitle>
                                            </DialogHeader>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto p-4">
                                                <div>
                                                    <h3 className="font-semibold mb-2">Front ID:</h3>
                                                    <Image src="https://placehold.co/400x250.png" alt="Front ID" width={400} height={250} className="rounded-md w-full" data-ai-hint="id card" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold mb-2">Back ID:</h3>
                                                    <Image src="https://placehold.co/400x250.png" alt="Back ID" width={400} height={250} className="rounded-md w-full" data-ai-hint="id card back" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold mb-2">Selfie with ID:</h3>
                                                    <Image src="https://placehold.co/400x250.png" alt="Selfie with ID" width={400} height={250} className="rounded-md w-full" data-ai-hint="person selfie" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold mb-2">Signature:</h3>
                                                    <div className="border rounded-md h-48 flex items-center justify-center bg-gray-100">
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
                                        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white" onClick={() => handleLoanAction(loan.id, 'Approved')}>
                                            <Check className="mr-1 h-4 w-4" />
                                            Approve
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleLoanAction(loan.id, 'Rejected')}>
                                            <X className="mr-1 h-4 w-4" />
                                            Reject
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center">No pending loans found.</TableCell>
                            </TableRow>
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
