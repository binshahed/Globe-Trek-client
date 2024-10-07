/* eslint-disable no-unused-vars */
import { useUpdateCommentMutation } from "@/src/store/features/comment/commentApi";
import { TError } from "@/src/types/global.Type";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Textarea
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { toast } from "sonner"; // Import toast from Sonner

export default function UpdateCommentModal({ data }: { data: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [commentValue, setCommentValue] = useState(data?.comment);
  const [updateComment, { isLoading, error }] = useUpdateCommentMutation();

  const handlePostComment = async () => {
    try {
      const response = await updateComment({
        comment: commentValue,
        commentId: data?._id
      }).unwrap(); // Unwrap the promise to get the actual response

      toast.success("Comment updated successfully!"); // Show success message

      onOpenChange(); // Close the modal after successful update
    } catch (err) {
      console.error("Error updating comment:", err);
      toast.error(
        (error as TError)?.data?.message ||
          "An error occurred while updating the comment. Please try again."
      ); // Show error message
    }
  };

  // Reset the comment value when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setCommentValue(data?.comment); // Reset the comment value to the original
    }
  }, [isOpen, data]);

  return (
    <>
      <Button onPress={onOpen}>Edit</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Comment
              </ModalHeader>
              <ModalBody>
                <div className="py-10">
                  <Textarea
                    label="Comment"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Enter Your Comment"
                    value={commentValue}
                    onChange={(e) => setCommentValue(e.target.value)}
                    className="w-full"
                  />
                  <Button
                    color="primary"
                    className="mt-4"
                    onClick={handlePostComment}
                    disabled={isLoading} // Disable the button while loading
                  >
                    {isLoading ? "Updating..." : "Update Comment"}
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
