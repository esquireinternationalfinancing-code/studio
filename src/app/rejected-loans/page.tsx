
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
import { XCircle, RefreshCw, Search, Eye } from "lucide-react";
import Image from "next/image";

interface RejectedLoan {
  id: string;
  name: string;
  phone: string;
  amount: string;
  term: number;
  dateRejected: string;
  rejectedBy: string;
  status: string;
}

export default function RejectedLoansPage() {
  const [rejectedLoans, setRejectedLoans] = useState<RejectedLoan[]>([]);

  useEffect(() => {
    const storedRejectedLoans = localStorage.getItem('rejectedLoans');
    if (storedRejectedLoans) {
      setRejectedLoans(JSON.parse(storedRejectedLoans));
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar activePage="rejected-loans" />
      <div className="flex flex-col w-full">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <XCircle className="h-6 w-6 text-red-600" />
                    <CardTitle className="text-2xl font-bold">Rejected Loan List</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-center gap-4">
                <Input placeholder="Search Name..." className="max-w-xs" />
                <Input placeholder="Search Phone..." className="max-w-xs" />
                <Button className="bg-red-500 hover:bg-red-600 text-white">
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
                      <TableRow className="bg-red-100 hover:bg-red-100/80">
                        <TableHead>Loan ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Term</TableHead>
                        <TableHead>Date Rejected</TableHead>
                        <TableHead>Rejected By</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rejectedLoans.length > 0 ? (
                            rejectedLoans.map((loan) => (
                                <TableRow key={loan.id}>
                                    <TableCell>{loan.id}</TableCell>
                                    <TableCell>{loan.name}</TableCell>
                                    <TableCell>{loan.phone}</TableCell>
                                    <TableCell>{loan.amount}</TableCell>
                                    <TableCell>{loan.term}</TableCell>
                                    <TableCell>{loan.dateRejected}</TableCell>
                                    <TableCell>{loan.rejectedBy ?? 'null'}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-red-600 border-red-600">{loan.status}</Badge>
                                    </TableCell>
                                    <TableCell className="flex gap-2">
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
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={9} className="text-center">No rejected loans found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                  </Table>
                </div>
                 <div className="flex justify-end items-center gap-4 mt-4">
                    <Button variant="outline" disabled>Previous</Button>
                    <span>Page 1 of 1</span>
                    <Button variant="outline" disabled>Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
