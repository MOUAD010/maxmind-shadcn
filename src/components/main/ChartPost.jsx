import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const ChartPost = ({ Postid }) => {
  // Fetching post statistics
  const getPostsStates = async () => {
    const response = await axios.post(
      `https://meta-api-eight.vercel.app/api/v1/feed/summary/${Postid}`,
      {
        metric:
          "post_impressions,post_impressions_organic,post_impressions_paid,post_engaged_users,post_clicks,post_reactions_by_type_total,post_negative_feedback",
        period: "lifetime",
      }
    );
    return response.data.data.data;
  };

  const {
    data: post_states,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts", Postid],
    queryFn: getPostsStates,
  });

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
    return <div>Error loading data.</div>;
  }

  // Map and filter data to be compatible with recharts
  const chartData = post_states
    .filter((stat) => stat.name !== "post_reactions_by_type_total") // Exclude "post reactions by type total"
    .map((stat) => {
      let formattedValue = stat.values[0].value;
      if (typeof formattedValue === "object") {
        // For reaction types (if necessary)
        formattedValue = Object.entries(formattedValue)
          .map(([key, value]) => `${key}: ${value}`)
          .join(", ");
      }
      return {
        name: stat.name
          .replace(/_/g, " ")
          .replace("post impressions", "Total Impressions")
          .replace("post impressions organic", "Organic Impressions")
          .replace("post impressions paid", "Paid Impressions")
          .replace("post reactions by type total", "Reactions by Type")
          .replace("post negative feedback", "Negative Feedback"),
        value: formattedValue,
      };
    });

  // Define colors for each segment
  const colors = ["#4a90e2", "#50e3c2", "#e94e77", "#f5a623", "#b2bec3"];

  return (
    <ResponsiveContainer width="100%" className=" pb-2" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={150}
          label
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: "#fff", border: "1px solid #ddd" }}
          itemStyle={{ color: "#333" }}
          formatter={(value, name) => [`${name}: ${value}`]}
        />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          formatter={(value, entry, index) => (
            <span style={{ color: colors[index % colors.length] }}>
              {value}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ChartPost;
