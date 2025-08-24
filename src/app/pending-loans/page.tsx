
"use client";

import { useState } from "react";
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


const initialPendingLoans = [
    { id: '1015', name: '22', phone: '22', amount: '¥22,220,000', term: 6, requestedAt: '8/24/2025, 9:33:56 AM', status: 'Pending' },
    { id: '1014', name: '33', phone: '33', amount: '¥500,000', term: 6, requestedAt: '8/24/2025, 9:14:14 AM', status: 'Pending' },
    { id: '1013', name: '333', phone: '33', amount: '¥500,000', term: 12, requestedAt: '8/19/2025, 6:38:43 PM', status: 'Pending' },
    { id: '1012', name: '荒木弘', phone: '0423374488', amount: '¥500,000', term: 24, requestedAt: '8/18/2025, 9:20:14 AM', status: 'Pending' },
    { id: '1005', name: 'Pro Player', phone: '7777777777', amount: '¥1,150,000', term: 12, requestedAt: '8/12/2025, 2:34:46 PM', status: 'Pending' },
    { id: '1000', name: 'Testing', phone: '6666666666', amount: '¥800,000', term: 12, requestedAt: '8/12/2025, 2:30:42 PM', status: 'Pending' },
];


export default function PendingLoansPage() {
  const [pendingLoans, setPendingLoans] = useState(initialPendingLoans);

  const handleLoanAction = (loanId: string, newStatus: 'Approved' | 'Rejected') => {
    // In a real app, you would send this to a server.
    // For now, we'll just filter it out from the pending list.
    console.log(`Loan ${loanId} has been ${newStatus}`);
    setPendingLoans(currentLoans => currentLoans.filter(loan => loan.id !== loanId));
  };


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
                <Input placeholder="Search Name..." className="max-w-xs" />
                <Input placeholder="Search Phone..." className="max-w-xs" />
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
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
                        {pendingLoans.map((loan) => (
                            <TableRow key={loan.id}>
                                <TableCell>{loan.id}</TableCell>
                                <TableCell>{loan.name}</TableCell>
                                <TableCell>{loan.phone}</TableCell>
                                <TableCell>{loan.amount}</TableCell>
                                <TableCell>{loan.term}</TableCell>
                                <TableCell>{loan.requestedAt}</TableCell>
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
                                    <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                                        <Edit className="mr-1 h-4 w-4" />
                                        Update Loan
                                    </Button>
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
