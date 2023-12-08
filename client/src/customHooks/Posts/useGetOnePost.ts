import { useEffect, useState, useCallback } from "react";
import { PostType, emptyPostType } from "../../types/blogTypes";
import { useShowInfo } from "../useShowInfo";
export const useGetOnePost = (id: string) => {
  const [data, setData] = useState<PostType>(emptyPostType);
  const { showError } = useShowInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedShowError = useCallback(showError, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          import.meta.env.VITE_API_URL + "/article/" + id,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          memoizedShowError(
            "Nie udało się pobrać tego artykułu. Spróbuj ponownie później"
          );
        }
        const post = await response.json();
        setData(post.post as PostType);
      } catch (err) {
        memoizedShowError("Wystąpił błąd podczas pobierania danych");
      }
    };
    fetchData();
  }, [id, memoizedShowError]);
  return { data };
};
