"use client";

import ChartLoading from "@/src/components/UI/ChartLoading";
import { useCurrentUser } from "@/src/store/features/auth/authSlice";
import {
  useChangeRoleMutation,
  useGetUsersQuery
} from "@/src/store/features/user/userApi";
import { TError } from "@/src/types/global.Type";
import { Chip } from "@nextui-org/chip";
import { Select, SelectItem } from "@nextui-org/select";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/table";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const ManageUsers = () => {
  const currentUser = useSelector(useCurrentUser);
  const { data, isLoading } = useGetUsersQuery(undefined);
  const users = data?.data || [];

  const [changeRole, { isLoading: isUpdateUserRole, isError, error }] =
    useChangeRoleMutation();

  const handleChange = (e: string, userId: string) => {
    changeRole({ role: e, user: userId });
  };

  if (!isLoading && isError) {
    toast.error((error as TError)?.data?.message);
  }

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
                  <Select
                    label="Select"
                    className="w-[100px]"
                    variant="bordered"
                    isDisabled={currentUser?.data?._id === user?._id}
                    onChange={(e) => handleChange(e.target.value, user?._id)}
                    isLoading={isUpdateUserRole}
                  >
                    <SelectItem key="admin">Admin</SelectItem>
                    <SelectItem key="user">User</SelectItem>
                  </Select>
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
