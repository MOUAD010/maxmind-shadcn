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
    <div className="flex justify-center mt-8">
      <Card className="w-[1220px] shadow-lg mb-4">
        <div className="flex flex-row px-6 my-4">
          {/* Image Skeleton */}
          <div className="w-1/3 p-2">
            <Skeleton className="w-full h-[500px] rounded-lg shadow-lg" />
          </div>
          {/* Text and actions Skeleton */}
          <div className="w-2/3 p-4">
            <CardContent className="flex flex-col">
              <Skeleton className="h-4 w-[75%] mb-4" />
              <Skeleton className="h-4 w-[50%] mb-4" />
              <Skeleton className="h-4 w-[40%] mb-6" />
              <div className="flex justify-start gap-6 mt-4">
                <Skeleton className="h-4 w-[30px]" />
                <Skeleton className="h-4 w-[30px]" />
              </div>
            </CardContent>
          </div>
        </div>
        <CardFooter className="flex justify-between p-4 pt-4">
          <Skeleton className="h-4 w-[100px]" />
        </CardFooter>
      </Card>
    </div>
  );
};

export default SkeletonPost;
