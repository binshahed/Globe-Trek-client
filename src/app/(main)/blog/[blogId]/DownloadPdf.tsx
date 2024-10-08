"use client";

import React from "react";
import jsPDF from "jspdf";
import { Button } from "@nextui-org/button";

const DownloadPdf = ({ blogData }: { blogData: any }) => {
  const handleDownloadPdf = async () => {
    const doc = new jsPDF();
    const margin = 10; // Margin from the edges
    const pageWidth = doc.internal.pageSize.getWidth() - margin * 2; // Calculate available width for text

    // Add Title
    doc.setFontSize(24);
    doc.text(blogData.title, margin, 20);

    // Add Slug
    doc.setFontSize(12);
    doc.text(`Slug: ${blogData.slug}`, margin, 30);

    // Add Published Date
    doc.text(
      `Published on: ${new Date(blogData.createdAt).toLocaleDateString()}`,
      margin,
      40
    );

    // Add Author Name
    doc.text(`Author: ${blogData?.author?.name}`, margin, 50);

    // Add Featured Image
    if (blogData.featuredImage) {
      const img = await fetch(blogData.featuredImage).then((res) => res.blob());
      const imgData = URL.createObjectURL(img);
      doc.addImage(imgData, "JPEG", margin, 60, 180, 100); // Adjust dimensions as needed
    }

    // Convert HTML content to plain text
    const content = blogData.content;
    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(content, "text/html");
    const textContent = htmlDocument?.body.textContent || ""; // Get the plain text

    // Add Blog Content
    const contentLines = doc.splitTextToSize(textContent, pageWidth); // Split content to fit page width
    let yPosition = 170; // Adjust based on previous content

    for (const line of contentLines) {
      doc.text(line, margin, yPosition);
      yPosition += 10; // Increase the y position for the next line
    }

    // Save the PDF
    doc.save(`${blogData.title}.pdf`);
  };

  return (
    <Button onClick={handleDownloadPdf} color="secondary">
      Download
    </Button>
  );
};

export default DownloadPdf;
