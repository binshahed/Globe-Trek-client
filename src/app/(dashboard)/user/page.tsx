"use client";

import UpdateBlogModal from "@/src/components/modals/UpdateBlogModal";
import ChartLoading from "@/src/components/UI/ChartLoading";
import {
  useDeleteBlogMutation,
  useMyBlogQuery
} from "@/src/store/features/blog/blogApi";
import { TError } from "@/src/types/global.Type";
import { Button } from "@nextui-org/button";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from "@nextui-org/table";
import moment from "moment";
import React from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

const UserDashboard = () => {
  const { data: blogData, isLoading } = useMyBlogQuery(undefined);
  const [
    deleteBlog,
    { isLoading: isLoadingDeletingBlog, isSuccess, isError, error }
  ] = useDeleteBlogMutation();

  const handleDeleteBlog = (id: string) => {
    deleteBlog(id);
  };

  if (!isLoadingDeletingBlog && isSuccess) {
    toast.success("Blog deleted successfully");
  }

  if (!isLoadingDeletingBlog && isError) {
    toast.error(
      (error as TError)?.data?.message ||
        "Failed to delete blog. Please try again."
    );
  }

  return (
    <div>
      <h3 className="my-5 text-center font-bold text-md">Manage Blog</h3>
      <div>
        {isLoading ? (
          <ChartLoading />
        ) : blogData?.data.length === 0 ? (
          <p className="text-center text-red-600">No Blog Found</p>
        ) : (
          <div>
            <Table isStriped aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Blog</TableColumn>
                <TableColumn>Published</TableColumn>

                <TableColumn>Action</TableColumn>
              </TableHeader>
              <TableBody>
                {blogData?.data?.map((blog: any) => (
                  <TableRow key={blog?._id}>
                    <TableCell>{blog?.author?.name}</TableCell>
                    <TableCell>{blog?.title}</TableCell>
                    <TableCell>
                      {moment(blog?.createdAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </TableCell>

                    <TableCell>
                      <UpdateBlogModal blogData={blog} />
                      <Button
                        isIconOnly
                        color="danger"
                        aria-label="Edit Post"
                        className="min-w-7 w-7 h-7 mt-2"
                        onClick={() => handleDeleteBlog(blog?._id)}
                        isLoading={isLoadingDeletingBlog}
                      >
                        <MdDelete className="w-5 h-5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
