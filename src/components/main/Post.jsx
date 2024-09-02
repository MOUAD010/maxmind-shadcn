import React from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Heart, MessageCircle, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import SkeletonPost from "./SkeletonPost";
import ChartPost from "./ChartPost";
import no_image from "../../assets/noimage.jpg";

const Post = ({ selectedPageId, limit, from, end }) => {
  const getPagePosts = async () => {
    const response = await axios.post(
      `https://meta-api-eight.vercel.app/api/v1/page/${selectedPageId}/feeds`,
      { limit: limit, since: from, until: end }
    );
    return response.data.data.data;
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
      <div className=" flex justify-center mt-8 gap-2">
        <SkeletonPost />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading posts.</div>;
  }

  const cards = (page_posts || []).map((item, index) => (
    <Card key={index} className="w-[600px] shadow-md">
      <div className="flex">
        {/* This parent div will align its children horizontally */}
        <CardHeader className="w-1/2 p-0">
          {/* Image section taking half the width of the card */}
          <img
            src={item.full_picture || no_image}
            alt="Post Image"
            className="w-full h-[350px] object-center"
          />
        </CardHeader>
        <CardContent className="w-1/2 p-4  flex flex-col justify-start">
          {/* Content section taking the other half width */}
          <h3 className="text-base font-semibold mb-2 break-words">
            {item.message || "ce post n'a pas de légende"}
          </h3>

          <p className="text-lg font-semibold flex gap-2 mt-4">
            <span>
              <Calendar size={25} />
            </span>
            {moment(item.created_time).format("MMMM DD, YYYY")}
          </p>
        </CardContent>
      </div>
      <CardFooter className="flex justify-between p-4 pt-4">
        <div title="reaction" className=" flex justify-center items-center">
          <Heart size={25} className="mt-1" />{" "}
          <span className=" text-2xl">
            {" "}
            {item.reactions.summary.total_count}
          </span>{" "}
        </div>
        <div title="comments" className=" flex justify-center items-center">
          <MessageCircle size={25} className="mt-0" />
          <span className=" text-2xl">
            {" "}
            {item.comments.summary.total_count}
          </span>{" "}
        </div>
      </CardFooter>
      <div> {/* <ChartPost Postid={item.id} /> */}</div>
      <ChartPost Postid={item.id} />
    </Card>
  ));

  return (
    <div className="my-6 flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{cards}</div>
    </div>
  );
};

export default Post;
