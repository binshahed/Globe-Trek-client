"use client";

import ChartLoading from "@/src/components/UI/ChartLoading";
import { useGetUsersQuery } from "@/src/store/features/user/userApi";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/table";
import React from "react";

const ManageUsers = () => {
  const { data, isLoading } = useGetUsersQuery(undefined);
  const users = data?.data || [];
  console.log(users);

  return (
    <div>
      <h3 className="mb-5 text-center font-bold text-md">Manage Users</h3>
      {isLoading ? (
        <ChartLoading />
      ) : (
        <Table isStriped aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Email</TableColumn>
            <TableColumn>Subscription</TableColumn>
            <TableColumn>Role</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            {users?.map((user: any) => (
              <TableRow key={user?._id}>
                <TableCell>{user?.name}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>
                  {user?.subscriptions === "free" ? (
                    <Chip color="warning">{user?.subscriptions}</Chip>
                  ) : (
                    <Chip color="success">{user?.subscriptions}</Chip>
                  )}
                </TableCell>
                <TableCell>
                  {user?.role === "admin  " ? (
                    <Chip color="warning">{user?.role}</Chip>
                  ) : (
                    <Chip color="success">{user?.role}</Chip>
                  )}
                </TableCell>
                <TableCell>
                  <Button>Update</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default ManageUsers;
