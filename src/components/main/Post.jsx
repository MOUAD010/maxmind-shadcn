import React, { useRef, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import SkeletonPost from "./SkeletonPost";
import ShadcnChart from "./ShadcnChart";
import no_image from "../../assets/noimage.jpg";
import RightDrawer from "../ui/RightDrawer";
import html2canvas from "html2canvas";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "./DataToPdf";
import { Button } from "../ui/button";
import Spinner from "../ui/spinner"; // Assuming you have a Spinner component for loading

const Post = ({ selectedPageId, limit, from, end }) => {
  const chartRef = useRef();
  const [chartImage, setChartImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pdfPrepared, setPdfPrepared] = useState(false); // New state for PDF preparation

  const getPagePosts = async () => {
    const response = await axios.post(
      `https://meta-api-eight.vercel.app/api/v1/page/${selectedPageId}/feeds`,
      { limit: limit, since: from, until: end }
    );
    return response.data.data.data;
  };

  const handleDownloadPdf = async () => {
    setLoading(true); // Start loading state

    if (chartRef.current) {
      // Capture the chart with higher quality settings
      const canvas = await html2canvas(chartRef.current, {
        scale: 3, // Increase the scale for better resolution
        backgroundColor: null, // Maintain transparency if the background is transparent
        useCORS: true, // Handle cross-origin images if any are present
        logging: false, // Disable logging to console for performance
        imageTimeout: 15000, // Timeout for loading images (increase if necessary)
      });

      const imgData = canvas.toDataURL("image/png"); // Convert to data URL
      setChartImage(imgData); // Set the chart image
    }

    setLoading(false); // Stop loading state
    setPdfPrepared(true); // Set PDF prepared state to true
  };

  const {
    data: page_posts,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts", selectedPageId, limit, from, end],
    queryFn: getPagePosts,
    enabled: !!selectedPageId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center mt-8 gap-2">
        <SkeletonPost />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading posts.</div>;
  }

  if (page_posts.length === 0) {
    return (
      <div className="text-black p-4 m-4 flex justify-center w-full h-auto text-2xl">
        <p>Cette page n'a pas de publication aux dates indiquées</p>
      </div>
    );
  }

  const cards = page_posts.map((item, index) => (
    <Card key={index} className="w-[1120px] shadow-lg mb-4">
      {/* Image section */}
      <div className="flex flex-row justify-start items-start px-6">
        <img
          src={item.full_picture || no_image}
          alt="Post Image"
          className="object-fit h-[350px] w-[30%] max-h-[440px] mt-8"
        />

        {/* Text and actions section */}
        <div className="w-[70%] p-4">
          <CardContent className="flex flex-col">
            <p className="text-base my-4 break-words">
              {item.message || "Ce post n'a pas de légende"}
            </p>
            <div>
              <div className="flex justify-between">
                <p className="text-sm mt-2 flex items-center gap-2">
                  <Calendar size={20} />
                  {moment(item.created_time).format("MMMM DD, YYYY")}
                </p>
                <div className="flex justify-start gap-2">
                  <div className="">
                    <div className="flex justify-center mt-2 gap-1">
                      <Heart className="mt-1" size={19} />
                      <span className="text-base">
                        {item.reactions.summary.total_count}
                      </span>
                    </div>
                  </div>
                  <div className="">
                    {item.comments.summary.total_count > 0 ? (
                      <RightDrawer>
                        <div className="flex justify-center mt-2 gap-1 cursor-pointer">
                          <MessageCircle className="mt-1" size={19} />
                          <span className="text-base">
                            {item.comments.summary.total_count}
                          </span>
                        </div>
                      </RightDrawer>
                    ) : (
                      <div className="flex justify-center mt-2 gap-1">
                        <MessageCircle className="mt-1" size={19} />
                        <span className="text-base">
                          {item.comments.summary.total_count}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </div>
      <div className="mt-4 h-full flex" ref={chartRef}>
        <ShadcnChart />
      </div>
    </Card>
  ));

  return (
    <div>
      <div className="my-4 flex justify-center">
        {loading ? (
          <div className="flex items-center gap-2">
            Loading..... {/* Display a spinner while loading */}
          </div>
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
            onClick={handleDownloadPdf}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Prepare The PDF
          </Button>
        )}
      </div>
      <div className="my-6 flex flex-col items-center">{cards}</div>
    </div>
  );
};

export default Post;
