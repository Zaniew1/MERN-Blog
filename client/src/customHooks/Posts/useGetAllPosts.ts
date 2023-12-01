import {useEffect, useState, } from 'react';
// import {blogData} from '../../../public/data/data.js'

import { PostType } from '../../types/blogTypes'

export const useGetAllPosts =  () => {
    const [posts , setPosts] = useState<PostType[]>([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("https://mern-blog-ivory.vercel.app/article", {
                method: "GET",
                mode: "no-cors",
                headers: {
                  "Content-Type": "application/json",
                },
              });
              const data = await  response.json();
              setPosts(data.posts)
        };
        fetchPosts();
      }, []);
      return posts
}