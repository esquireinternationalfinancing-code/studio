import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function AdministratorPage() {
  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar activePage="administrator" />
      <div className="flex flex-col w-full">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">User Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <Input placeholder="Admin" />
                <Input type="password" placeholder="Password" />
                <Input placeholder="Phone Number" />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="User" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
                <div className="md:col-span-4">
                  <Button>Add User</Button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label htmlFor="search-phone">Search by phone:</label>
                <Input id="search-phone" placeholder="Enter phone number" className="max-w-xs" />
                <Button>Search</Button>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">All Users</h3>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Password</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Admin</TableCell>
                        <TableCell>********</TableCell>
                        <TableCell>88889999</TableCell>
                        <TableCell>Admin</TableCell>
                        <TableCell>07/08/2025, 16:00:40</TableCell>
                        <TableCell className="space-x-2">
                          <Button variant="outline" size="sm" className="bg-yellow-500 text-white hover:bg-yellow-600">Update</Button>
                          <Button variant="destructive" size="sm">Delete</Button>
                        </TableCell>
                      </TableRow>
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
