import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

const SkeletonPost = () => {
  return (
    <div className="flex gap-2">
      <Card className="w-[600px] shadow-md">
        <div className="flex">
          {/* Skeleton structure to match the Card component */}
          <CardHeader className="w-1/2 p-0">
            <Skeleton className="w-full h-[350px] object-center rounded-lg" />
          </CardHeader>
          <CardContent className="w-1/2 p-4 flex flex-col justify-start">
            <h3 className="text-lg font-semibold mb-2">
              <Skeleton className="h-4 w-[200px]" />
            </h3>
            <Skeleton className="h-4 w-[150px] mt-4" />
          </CardContent>
        </div>
        <CardFooter className="flex justify-between p-4 pt-4">
          <div title="reaction" className="flex justify-center items-center">
            <Skeleton className="h-4 w-[30px] mr-2" />
            <Skeleton className="h-4 w-[20px]" />
          </div>
          <div title="comments" className="flex justify-center items-center">
            <Skeleton className="h-4 w-[30px] mr-2" />
            <Skeleton className="h-4 w-[20px]" />
          </div>
        </CardFooter>
      </Card>

      {/* Duplicate the card to match your design */}
      <Card className="w-[600px] shadow-md">
        <div className="flex">
          <CardHeader className="w-1/2 p-0">
            <Skeleton className="w-full h-[350px] object-center rounded-lg" />
          </CardHeader>
          <CardContent className="w-1/2 p-4 flex flex-col justify-start">
            <h3 className="text-lg font-semibold mb-2">
              <Skeleton className="h-4 w-[200px]" />
            </h3>
            <Skeleton className="h-4 w-[150px] mt-4" />
          </CardContent>
        </div>
        <CardFooter className="flex justify-between p-4 pt-4">
          <div title="reaction" className="flex justify-center items-center">
            <Skeleton className="h-4 w-[30px] mr-2" />
            <Skeleton className="h-4 w-[20px]" />
          </div>
          <div title="comments" className="flex justify-center items-center">
            <Skeleton className="h-4 w-[30px] mr-2" />
            <Skeleton className="h-4 w-[20px]" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SkeletonPost;
