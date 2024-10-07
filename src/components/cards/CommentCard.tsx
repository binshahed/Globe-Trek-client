import React from "react";
import { Card,  CardBody, Avatar, Button } from "@nextui-org/react";
import moment from "moment";
import { useDeleteCommentMutation } from "@/src/store/features/comment/commentApi";
import { toast } from "sonner";
import UpdateCommentModal from "../modals/UpdateCommentModal";
import { TUserData } from "@/src/types/TUser";

export default function CommentCard({
  user,
  comment
}: {
  comment: any;
  user: TUserData;
}) {
  const [deleteComment, { isSuccess: isDeleteSuccess, isLoading }] =
    useDeleteCommentMutation();

  const handleDelete = () => {
    deleteComment(comment?._id);
  };

  if (!isLoading && isDeleteSuccess) {
    toast.success("comment deleted successfully");
  }


  const isOwner = comment?.user?._id === user?.data?._id;


  return (
    <Card className="max-w-full my-5">
      <CardBody className="p-5 pb-5 text-small text-default-400">
        <div className="flex justify-between">
          <div>
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
            <p className="mt-3 ml-14 text-medium text-default-700">
              {comment?.comment}
            </p>
          </div>
          {isOwner && (
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
          )}
        </div>
      </CardBody>
    </Card>
  );
}
