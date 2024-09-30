import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import GlobeForm from "../../form/GlobeForm";
import GlobeInput from "../../form/GlobeInput";
import dynamic from "next/dynamic";
import axios from "axios";
import "react-quill/dist/quill.snow.css"; // Import styles
import envConfig from "@/src/config";
import { createBlog } from "@/src/service/blogs";
import { useSelector } from "react-redux";
import { useCurrentUser } from "@/src/store/features/auth/authSlice";
import { toast } from "sonner"; // Import Sonner

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreatePost = () => {
  const user = useSelector(useCurrentUser);

  const [title, setTitle] = useState(""); // Title state
  const [slug, setSlug] = useState(""); // Slug state
  const [content, setContent] = useState(""); // For Rich Text Editor content
  const [imageFile, setImageFile] = useState<File | null>(null); // File for uploading
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Preview URL
  const [loading, setLoading] = useState(false); // For loading state

  // Generate image preview when an image is selected
  useEffect(() => {
    if (imageFile) {
      const previewUrl = URL.createObjectURL(imageFile);
      setImagePreview(previewUrl);

      // Cleanup the URL object when the component unmounts or file changes
      return () => URL.revokeObjectURL(previewUrl);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  // Handle image upload to ImgBB
  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${envConfig.image_bb}`, // Replace with your ImgBB API key
        formData
      );
      const url = response.data.data.url;
      return url; // Return the image URL
    } catch (error) {
      console.error("Image upload failed", error);
      toast.error("Image upload failed. Please try again."); // Sonner error message
      return null;
    }
  };

  const handleSubmit = async (data: any) => {
    setLoading(true); // Set loading state

    try {
      // 1. Upload the image
      const uploadedImageUrl = await uploadImage();

      if (!uploadedImageUrl) {
        throw new Error("Image upload failed");
      }

      // 2. Prepare the post data
      const postData = {
        title,
        slug,
        content,
        author: user?.data?._id,
        featuredImage: uploadedImageUrl // Set uploaded image URL
      };

      // 3. Submit the blog data to the backend
      const response = await createBlog(postData);

      if (!response) throw new Error("Failed to create post");

      // 4. Success feedback via Sonner
      toast.success("Post created successfully!");

      // 5. Clear all the form fields
      setTitle("");
      setSlug("");
      setContent("");
      setImageFile(null);
      setImagePreview(null);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message || "Failed to create post. Please try again."); // Sonner error message
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
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
        <ReactQuill value={content} onChange={setContent} />
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
        {/* Loading indicator during image upload */}
        {loading && <p>Uploading...</p>}

        <div className="mt-10">
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </GlobeForm>
    </div>
  );
};

export default CreatePost;
