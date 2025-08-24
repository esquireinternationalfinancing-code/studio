
"use client";

import { useState, useEffect } from "react";
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
import type { User } from "@/services/api";
import { getUsers } from "@/services/api";

export default function AdministratorPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchUsers = async () => {
    setIsLoading(true);
    const data = await getUsers();
    setUsers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.phone.includes(searchTerm)
  );

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
                    <SelectItem value="killer">Killer</SelectItem>
                  </SelectContent>
                </Select>
                <div className="md:col-span-4">
                  <Button>Add User</Button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <label htmlFor="search-phone">Search by phone:</label>
                <Input 
                  id="search-phone" 
                  placeholder="Enter phone number" 
                  className="max-w-xs" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={() => setSearchTerm('')}>Search</Button>
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
                      {isLoading ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center">Loading users...</TableCell>
                        </TableRow>
                      ) : filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>********</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.createdAt}</TableCell>
                            <TableCell className="space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" className="bg-yellow-500 text-white hover:bg-yellow-600">Update</Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Update User {user.username}</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <Input placeholder="New phone number" />
                                    <Input type="password" placeholder="New password" />
                                  </div>
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button>Save Changes</Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>

                              <Button variant="destructive" size="sm">Delete</Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center">No users found.</TableCell>
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
