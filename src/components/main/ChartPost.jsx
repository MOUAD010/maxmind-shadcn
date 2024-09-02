import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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
    return <div>Loading...</div>;
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
    <ResponsiveContainer width="100%" className="mb-6 pb-6" height={500}>
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
