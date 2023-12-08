import { CreatePostType } from "../../types/blogTypes";
import { useContext } from "react";
import { AuthContext } from "../../store/Auth-context";
import { useShowInfo } from "../useShowInfo";
export const useCreateNewPost = (postData: CreatePostType) => {
  const { showError, showSuccess } = useShowInfo();
  const { userData } = useContext(AuthContext);
  const createNewPost = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (postData.title.length < 8 || postData.title.length > 100)
        return showError("Długość tytułu powinna wynosić od 8 do 100 znaków");
      else if (postData.summary.length < 8 || postData.summary.length > 150)
        return showError(
          "Długość podsumowania powinna wynosić od 8 do 100 znaków"
        );
      else if (postData.content.length < 100 || postData.content.length > 10000)
        return showError(
          "Długość zawartości artykułu powinna wynosić od 8 do 100 znaków"
        );
      else if (
        postData.contentCategory.length < 4 ||
        postData.contentCategory.length > 50
      )
        return showError(
          "Długość kategorii tytułu powinna wynosić od 8 do 100 znaków"
        );
      const data = new FormData();
      data.set("title", postData.title);
      data.set("summary", postData.summary);
      data.set("content", postData.content);
      data.set("contentCategory", postData.contentCategory);
      data.set("mainPicture", postData.mainPicture ?? "");
      data.set("creator", `${userData.id}`);
      data.set("creatorAvatar", `${userData.avatar}`);
      const response = await fetch(import.meta.env.VITE_API_URL + "article", {
        method: "POST",
        body: data,
      });
      if (!response.ok) {
        showError("Nie udało się dodać artykułu. Spróbuj ponownie później!");
      } else {
        showSuccess("Udało się stworzyć artykuł!");
      }
    } catch (err) {
      showError("Wystąpił błąd podczas usuwania posta");
    }
  };
  return { createNewPost };
};
