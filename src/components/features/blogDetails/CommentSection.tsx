"use client";

import { useEffect, useState } from "react";
import {
  useCreateCommentMutation,
  useGetCommentQuery
} from "@/src/store/features/comment/commentApi";
import CommentCard from "../../cards/CommentCard";
import { Textarea, Button } from "@nextui-org/react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import {
  useLikeBlogMutation,
  useDislikeBlogMutation
} from "@/src/store/features/blog/blogApi"; // Import Dislike mutation
import { useCurrentUser } from "@/src/store/features/auth/authSlice";
import { useAppSelector } from "@/src/store/hooks";
import { toast } from "sonner";
import { TUserData } from "@/src/types/TUser";
import PostLoading from "../../UI/PoastLoading";

const CommentSection = ({
  blogId,
  blogData
}: {
  blogId: any;
  blogData: any;
}) => {
  const { data, isLoading } = useGetCommentQuery(blogId);
  const [likeBlog, { isLoading: isLiking }] = useLikeBlogMutation();
  const [dislikeBlog, { isLoading: isDisliking }] = useDislikeBlogMutation(); // Add Dislike mutation
  const [comment, setComment] = useState("");
  const [createComment] = useCreateCommentMutation();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const user = useAppSelector(useCurrentUser);

  const handlePostComment = async () => {
    if (!comment.trim()) return;

    try {
      await createComment({ blog: blogId, comment });
      setComment(""); // Clear the comment input after posting
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleLike = async () => {
    try {
      await likeBlog({ id: blogId });
      setIsLiked(!isLiked);
      toast.success(isLiked ? "Like Removed" : " Liked");
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  const handleDislike = async () => {
    try {
      await dislikeBlog({ id: blogId });
      setIsDisliked(!isDisliked);
      toast.success(isDisliked ? "DesLiked Remove" : " DesLiked");
    } catch (error) {
      console.error("Error disliking blog:", error);
    }
  };

  const isLikedByUser = blogData?.likes?.some(
    (like: any) => like?._id === user?.data?._id
  );
  const isDislikedByUser = blogData?.dislikes?.some(
    (dislike: any) => dislike?._id === user?.data?._id
  );

  useEffect(() => {
    setIsLiked(isLikedByUser);
    setIsDisliked(isDislikedByUser);
  }, [isLikedByUser, isDislikedByUser]);

  return (
    <div className="mt-10 border rounded-3xl p-10">
      {/* Like and Dislike Buttons */}

      <div className="">
        <div className="flex items-center mx-3">
          <Button
            className="min-w-0 w-10 p-2 m-5"
            isIconOnly
            color={isLiked ? "success" : "primary"} // Change color if liked
            aria-label={isLiked ? "Remove Like" : "Like"}
            onClick={handleLike}
            disabled={isLiking || isDisliking || !user?.data?.email} // Disable while liking or disliking
          >
            <AiFillLike className="w-10 h-10" />
          </Button>
          <Button
            className="min-w-0 w-10 p-2"
            isIconOnly
            color={isDisliked ? "danger" : "primary"} // Change color if disliked
            aria-label={isDisliked ? "Remove Dislike" : "Dislike"}
            onClick={handleDislike}
            disabled={isLiking || isDisliking || !user?.data?.email} // Disable while liking or disliking
          >
            <AiFillDislike className="w-10 h-10" />
          </Button>
        </div>

        <Textarea
          label="Comment"
          variant="bordered"
          labelPlacement="outside"
          placeholder="Enter Your Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full"
          isDisabled={!user?.data?.email}
        />
        <Button
          color="primary"
          className="mt-4"
          onClick={handlePostComment}
          isDisabled={!user?.data?.email}
        >
          Post Comment
        </Button>
      </div>

      {/* Display comments or loading state */}
      {isLoading ? (
        <PostLoading />
      ) : (
        data?.data?.map((comment: any) => (
          <CommentCard
            key={comment?._id}
            comment={comment}
            user={user as TUserData}
          />
        ))
      )}
    </div>
  );
};

export default CommentSection;
