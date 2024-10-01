import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalContent,
  useDisclosure
} from "@nextui-org/react"; // Using NextUI for modal

import dynamic from "next/dynamic";
import axios from "axios";
import "react-quill/dist/quill.snow.css"; // Import styles
import envConfig from "@/src/config";
import { useSelector } from "react-redux";
import { useCurrentUser } from "@/src/store/features/auth/authSlice";
import { toast } from "sonner"; // Import Sonner
import { CiEdit } from "react-icons/ci";
import GlobeForm from "../form/GlobeForm";
import GlobeInput from "../form/GlobeInput";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const UpdateBlogModal = ({ blogData }: { blogData: any }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const user = useSelector(useCurrentUser);

  const [title, setTitle] = useState(blogData?.title || "");
  const [slug, setSlug] = useState(blogData?.slug || "");
  const [content, setContent] = useState(blogData?.content || "");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    blogData?.featuredImage || ""
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (imageFile) {
      const previewUrl = URL.createObjectURL(imageFile);
      setImagePreview(previewUrl);
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setImagePreview(blogData?.featuredImage || null);
    }
  }, [imageFile, blogData?.featuredImage]);

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return imagePreview; // If no new image, use existing

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${envConfig.image_bb}`, // Replace with your ImgBB API key
        formData
      );
      return response.data.data.url;
    } catch (error) {
      console.error("Image upload failed", error);
      toast.error("Image upload failed. Please try again.");
      return null;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const uploadedImageUrl = await uploadImage();

      if (!uploadedImageUrl) {
        throw new Error("Image upload failed");
      }

      const postData = {
        title,
        slug,
        content,
        author: user?.data?._id,
        featuredImage: uploadedImageUrl
      };

      const response = ""; // Placeholder for actual update function

      // await updateBlog(user?.data?._id, blogData._id, postData);

      if (!response) throw new Error("Failed to update post");

      toast.success("Post updated successfully!");
      onOpenChange(); // Close the modal on success
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message || "Failed to update post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reset the modal fields when it is closed
  useEffect(() => {
    if (!isOpen) {
      setTitle(blogData?.title || "");
      setSlug(blogData?.slug || "");
      setContent(blogData?.content || "");
      setImageFile(null);
      setImagePreview(blogData?.featuredImage || "");
    }
  }, [isOpen, blogData]);

  return (
    <>
      <Button
        onPress={onOpen}
        isIconOnly
        color="default"
        aria-label="Edit Post"
        className="min-w-7 w-7 h-7 mt-2"
      >
        <CiEdit className="w-5 h-5" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Post
              </ModalHeader>
              <ModalBody>
                <GlobeForm onSubmit={handleSubmit}>
                  <GlobeInput
                    name="title"
                    label="Title"
                    value={title}
                    onChange={(e: any) => setTitle(e.target.value)}
                    required
                  />
                  <br />
                  <GlobeInput
                    name="slug"
                    label="Slug"
                    value={slug}
                    onChange={(e: any) => setSlug(e.target.value)}
                    required
                  />
                  <br />
                  <ReactQuill
                    style={{ maxHeight: "300px", overflow: "scroll" }}
                    value={content}
                    onChange={setContent}
                    placeholder="Enter your blog content here..."
                  />
                  <br />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setImageFile(e.target.files ? e.target.files[0] : null)
                    }
                  />
                  <br />
                  {imagePreview && (
                    <div>
                      <img src={imagePreview} alt="Preview" width="200" />
                    </div>
                  )}
                </GlobeForm>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={onClose}>
                  Close
                </Button>
                <Button onClick={handleSubmit} disabled={loading}>
                  {loading ? "Updating..." : "Update"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateBlogModal;
