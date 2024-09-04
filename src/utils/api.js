import axios from "axios";

export const getPages = async () => {
  const response = await axios.post(
    "https://meta-api-eight.vercel.app/api/v1/accounts",
    { limit: "10", after: "", before: "" }
  );
  return response.data.data.data;
};

export const getPagePosts = async (selectedPageId, limit, from, end) => {
  const response = await axios.post(
    `https://meta-api-eight.vercel.app/api/v1/page/${selectedPageId}/feeds`,
    { limit: limit, since: from, until: end }
  );
  return response.data.data.data;
};
