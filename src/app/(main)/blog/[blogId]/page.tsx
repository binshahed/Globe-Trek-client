import Container from "@/src/components/UI/Container";
import envConfig from "@/src/config";
import moment from "moment";
import React, { useRef } from "react";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import Image from "next/image";
import CommentSection from "@/src/components/features/blogDetails/CommentSection";
import PayNowModal from "@/src/components/modals/PayNowModal";
import jsPDF from "jspdf"; // Import jsPDF
import html2canvas from "html2canvas"; // Import html2canvas

export const revalidate = 0;

const BlogDetails = async ({ params }: { params: { blogId: string } }) => {
  const res = await fetch(`${envConfig.baseApi}/blog/${params?.blogId}`, {
    cache: "no-store", // Ensures fresh data is fetched each time
  });

  const { data } = await res.json();

  const contentRef = useRef<HTMLDivElement>(null); // Reference for the blog content

  // Function to handle PDF download
  const handleDownloadPDF = async () => {
    const input = contentRef.current;
    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${data?.title}.pdf`);
    }
  };

  return (
    <Container className="my-20">
      <PayNowModal blogData={data} />
      <h5 className="mt-4 text-3xl font-semibold">{data?.title}</h5>
      <h5 className="text-md">{data?.slug}</h5>
      <div className="my-3 flex items-center">
        <h5 className="text-small tracking-tight text-default-400 flex">
          <span className="m-1">
            <MdOutlineAccessTimeFilled />
          </span>
          {moment(data?.createdAt).calendar()}
        </h5>
        <h5 className="ml-5 flex text-small text-default-400">
          <span className="m-1">
            <FaUserEdit />
          </span>
          {data?.author?.name}
        </h5>
        <div className="flex items-center mx-3">
          <AiFillLike className="w-5 h-5" />
          <span className="text-small tracking-tight text-default-400 flex">
            {data?.likes.length}
          </span>
        </div>
        <div className="flex items-center mx-3">
          <AiFillDislike className="w-5 h-5" />
          <span className="text-small tracking-tight text-default-400 flex">
            {data?.dislikes.length}
          </span>
        </div>
      </div>

      <div className="w-full h-60 sm:h-80 lg:h-96 relative rounded-lg overflow-hidden shadow-lg">
        <Image
          src={data?.featuredImage}
          alt="Featured Image"
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>

      {/* Blog content section with ref for PDF generation */}
      <div ref={contentRef}>
        <div
          dangerouslySetInnerHTML={{
            __html: data.content,
          }}
        />
      </div>

      {/* Download PDF button */}
      <div className="mt-5">
        <button
          onClick={handleDownloadPDF}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      <CommentSection blogId={params?.blogId} blogData={data} />
    </Container>
  );
};

export default BlogDetails;
