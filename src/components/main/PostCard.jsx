import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, Calendar } from "lucide-react";
import moment from "moment";
import no_image from "../../assets/noimage.jpg";
import RightDrawer from "../ui/RightDrawer";
import ShadcnChart from "./ShadcnChart";

const PostCard = ({ item, chartRef }) => {
  return (
    <Card className="w-[1120px] shadow-lg mb-4">
      <div className="flex flex-row justify-start items-start px-6">
        <img
          src={item.full_picture || no_image}
          alt="Post Image"
          className="object-fit h-[350px] w-[30%] max-h-[440px] mt-8"
        />

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
  );
};

export default PostCard;
