import React, { useRef } from "react";
import axios from "axios";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, MessageCircle, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import SkeletonPost from "./SkeletonPost";
import ChartPost from "./ChartPost";
import ShadcnChart from "./ShadcnChart";
import no_image from "../../assets/noimage.jpg";
import RightDrawer from "../ui/RightDrawer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "../ui/button";

const Post = ({ selectedPageId, limit, from, end }) => {
  const getPagePosts = async () => {
    const response = await axios.post(
      `https://meta-api-eight.vercel.app/api/v1/page/${selectedPageId}/feeds`,
      { limit: limit, since: from, until: end }
    );
    return response.data.data.data;
  };
  const componentRef = useRef(null);

  const handleDownloadPdf = async () => {
    const element = componentRef.current;

    if (element) {
      // Ensure all images are loaded
      const images = Array.from(element.querySelectorAll("img"));
      const loadPromises = images.map(
        (img) =>
          new Promise((resolve) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }
          })
      );

      await Promise.all(loadPromises);

      const canvas = await html2canvas(element, { useCORS: true });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 220;
      const pageHeight = 150;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 1;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("download.pdf");
    }
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
    <Card key={index} className=" w-[1120px] shadow-lg mb-4 ">
      {/* Image section */}
      <div className=" flex flex-row justify-start items-start px-6  ">
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
                {" "}
                <p className="text-sm  mt-2 flex items-center gap-2">
                  <Calendar size={20} />
                  {moment(item.created_time).format("MMMM DD, YYYY")}
                </p>
                <div className="flex justify-start gap-2">
                  <div className="">
                    <div className="flex justify-center mt-2 gap-1">
                      <Heart className=" mt-1" size={19} />
                      <span className=" text-base">
                        {item.reactions.summary.total_count}
                      </span>
                    </div>
                  </div>
                  <div className="">
                    {item.comments.summary.total_count > 0 ? (
                      <RightDrawer>
                        <div className="flex justify-center mt-2  gap-1 cursor-pointer">
                          <MessageCircle className="mt-1" size={19} />
                          <span className=" text-base">
                            {item.comments.summary.total_count}
                          </span>
                        </div>
                      </RightDrawer>
                    ) : (
                      <div className="flex justify-center mt-2  gap-1">
                        <MessageCircle className="mt-1" size={19} />
                        <span className=" text-base">
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
      <div className="mt-4 h-full flex">
        {/* <ChartPost Postid={item.id} /> */}
        <ShadcnChart />
      </div>
    </Card>
  ));

  return (
    <div>
      <div className="my-4  flex justify-center">
        <Button onClick={handleDownloadPdf}>Dowloand Data To PDF</Button>
      </div>
      <div className="my-6 flex flex-col items-center" ref={componentRef}>
        {cards}
      </div>
    </div>
  );
};

export default Post;
