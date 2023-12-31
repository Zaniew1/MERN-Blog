import { useEffect, useState } from "react";
import { PostType } from "../../types/blogTypes";

export const useGetAllPosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(import.meta.env.VITE_API_URL + "/article", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return posts;
};
