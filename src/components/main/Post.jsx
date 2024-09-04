import React, { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import SkeletonPost from "./SkeletonPost";
import PostCard from "./PostCard"; // Import the new component
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "./DataToPdf";
import { Button } from "../ui/button";
import { getPagePosts } from "../../utils/api";
import { handleDownloadPdf } from "@/utils/utility";

const Post = ({ selectedPageId, limit, from, end }) => {
  const chartRef = useRef();
  const [chartImage, setChartImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pdfPrepared, setPdfPrepared] = useState(false);
  const handlePreparePDF = () => {
    handleDownloadPdf(chartRef, setChartImage, setLoading, setPdfPrepared);
  };
  useEffect(() => {
    setLoading(false);
    setPdfPrepared(false);
    setChartImage(null);
  }, [selectedPageId]);
  const {
    data: page_posts,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["posts", selectedPageId, limit, from, end],
    queryFn: () => getPagePosts(selectedPageId, limit, from, end),
    enabled: !!selectedPageId,
    refetchOnWindowFocus: false,
    staleTime: 10 * 60 * 1000,
  });

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center mt-8 gap-2">
        <SkeletonPost />
      </div>
    );
  }

  if (isError) {
    console.error("Error fetching posts:", isError);
    return <div>Error loading posts.</div>;
  }

  if (page_posts.length === 0) {
    return (
      <div className="text-black p-4 m-4 flex justify-center w-full h-auto text-2xl">
        <p>Cette page n'a pas de publication aux dates indiquées</p>
      </div>
    );
  }

  return (
    <div>
      <div className="my-4 flex justify-center">
        {loading ? (
          <div className="flex items-center gap-2">Loading.....</div>
        ) : pdfPrepared && chartImage ? (
          <PDFDownloadLink
            fileName="Data.pdf"
            style={{
              textDecoration: "none",
              padding: "10px 20px",
              color: "#ffffff",
              backgroundColor: "#007bff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            document={<PDFDocument data={page_posts} chartImage={chartImage} />}
          >
            {({ loading }) =>
              loading ? "Preparing document..." : "Download PDF"
            }
          </PDFDownloadLink>
        ) : (
          <Button
            onClick={handlePreparePDF}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Prepare The PDF
          </Button>
        )}
      </div>
      <div className="my-6 flex flex-col items-center">
        {page_posts.map((item, index) => (
          <PostCard key={index} item={item} chartRef={chartRef} />
        ))}
      </div>
    </div>
  );
};

export default Post;
