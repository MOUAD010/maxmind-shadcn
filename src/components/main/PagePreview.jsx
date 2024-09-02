import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ThumbsUp, Users, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const PagePreview = ({ PageId }) => {
  const getPageInfo = async () => {
    const response = await axios.get(
      `https://meta-api-eight.vercel.app/api/v1/page/${PageId}`
    );
    return response.data.data;
  };
  const {
    data: pageInfo,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["PageInfo", PageId], queryFn: getPageInfo });
  if (isLoading) {
    return (
      <div className=" flex justify-center mt-8 ">
        {/* <div className=" bg-blue-500 w-20 h-20 rounded-full flex justify-center items-center animate-bounce">
          <p className=" p-4 m-4 text-white">Loading..</p>
        </div> */}
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg font-medium text-center animate-pulse">
            Loading your content...
          </p>
          <p className="text-sm text-muted-foreground text-center">
            This may take a few moments
          </p>
        </div>
      </div>
    );
  }
  if (isError) {
    return <div>Error loading posts.</div>;
  }
  return (
    <div className="w-full">
      <Card className="w-full border-none shadow-none ">
        <CardHeader className="p-0">
          <img
            src={pageInfo.cover.source}
            alt="Profile cover"
            className="w-full h-60 object-fit"
          />
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <Badge className="flex items-center gap-1">
              <div title="Fan Count" className=" my-2 flex gap-1">
                {" "}
                <ThumbsUp className="w-4 h-4" />
                <span>{pageInfo.fan_count}</span>
              </div>
            </Badge>
            <Badge className="flex items-center gap-1 ">
              <div className="flex gap-1 my-2" title="followers count">
                {" "}
                <Users className="w-4 h-4" />
                <span>{pageInfo.followers_count}</span>
              </div>
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground">{pageInfo.about}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PagePreview;
