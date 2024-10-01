import React from "react";
import { Card, CardHeader, CardBody, Avatar, Button } from "@nextui-org/react";
import moment from "moment";
import { useDeleteCommentMutation } from "@/src/store/features/comment/commentApi";
import { toast } from "sonner";
import UpdateCommentModal from "../modals/UpdateCommentModal";

export default function CommentCard({ comment }: { comment: any }) {
  const [deleteComment, { isSuccess: isDeleteSuccess, isLoading }] =
    useDeleteCommentMutation();

  

  const handleDelete = () => {
    deleteComment(comment?._id);
  };

  if (!isLoading && isDeleteSuccess) {
    toast.success("comment deleted successfully");
  }
  
  

  return (
    <Card className="max-w-full my-5">
      <CardHeader className="flex justify-between items-start">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={comment?.user?.photoUrl}
          />
          <div className="flex flex-col gap-1">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {comment?.user?.name}
            </h4>
            <h5 className="text-small tracking-tight text-default-400">
              {moment(comment?.createdAt).calendar()}
            </h5>
          </div>
        </div>
        <div className="flex flex-col">
          <UpdateCommentModal data={comment} />
          <Button
            size="sm"
            color="danger"
            onClick={handleDelete}
            isLoading={isLoading}
            className="mt-2"
          >
            Delete
          </Button>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 pb-5 text-small text-default-400">
        <p>{comment?.comment}</p>
      </CardBody>
    </Card>
  );
}
