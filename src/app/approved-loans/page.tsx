
"use client";

import Link from "next/link";
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
import { Badge } from "@/components/ui/badge";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { CheckCircle, RefreshCw, Search, Eye, Edit } from "lucide-react";

const approvedLoans = [
    { id: '1007', name: '亜以井愛子', phone: '00425409066', amount: '¥500,000', term: 24, dateApproved: '8/19/2025, 9:29:53 AM', approvedBy: 'Admin', status: 'Approved' },
    { id: '1008', name: '亜以井愛子', phone: '0425409066', amount: '¥500,000', term: 24, dateApproved: '8/19/2025, 9:29:48 AM', approvedBy: 'Admin', status: 'Approved' },
    { id: '1009', name: '元木弘', phone: '0423374488', amount: '¥0', term: 24, dateApproved: '8/18/2025, 9:03:17 AM', approvedBy: 'Admin', status: 'Approved' },
    { id: '1006', name: '澤正和', phone: '0559559921', amount: '¥500,000', term: 24, dateApproved: '8/13/2025, 12:20:55 PM', approvedBy: null, status: 'Approved' },
    { id: '996', name: 'Andreas Rudi Schmetzer', phone: '00491723789846', amount: '¥250,000', term: 120, dateApproved: '8/9/2025, 1:16:15 PM', approvedBy: 'Admin', status: 'Approved' },
    { id: '1001', name: '5555555555', phone: '5555555555', amount: '¥52,500', term: 160, dateApproved: '8/7/2025, 3:45:49 PM', approvedBy: 'KR', status: 'Approved' },
];


export default function ApprovedLoansPage() {
  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar activePage="approved-loans" />
      <div className="flex flex-col w-full">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <CardTitle className="text-2xl font-bold">Approved Loan List</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex items-center gap-4">
                <Input placeholder="Search Name..." className="max-w-xs" />
                <Input placeholder="Search Phone..." className="max-w-xs" />
                <Button className="bg-green-500 hover:bg-green-600 text-white">
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
                      <TableRow className="bg-green-100 hover:bg-green-100/80">
                        <TableHead>Loan ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Term</TableHead>
                        <TableHead>Date Approved</TableHead>
                        <TableHead>Approved By</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {approvedLoans.map((loan) => (
                            <TableRow key={loan.id}>
                                <TableCell>{loan.id}</TableCell>
                                <TableCell>{loan.name}</TableCell>
                                <TableCell>{loan.phone}</TableCell>
                                <TableCell>{loan.amount}</TableCell>
                                <TableCell>{loan.term}</TableCell>
                                <TableCell>{loan.dateApproved}</TableCell>
                                <TableCell>{loan.approvedBy ?? 'null'}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="text-green-600 border-green-600">{loan.status}</Badge>
                                </TableCell>
                                <TableCell className="flex gap-2">
                                    <Link href={`/user-profile/${loan.id}`} passHref>
                                      <Button size="sm" variant="default">
                                          <Eye className="mr-1 h-4 w-4" />
                                          View Profile
                                      </Button>
                                    </Link>
                                    <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                                        <Edit className="mr-1 h-4 w-4" />
                                        Update Loan
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
                 <div className="flex justify-end items-center gap-4 mt-4">
                    <Button variant="outline" disabled>Previous</Button>
                    <span>Page 1 of 1</span>
                    <Button variant="outline">Next</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
