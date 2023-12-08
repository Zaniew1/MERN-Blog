import { useShowInfo } from "../useShowInfo";
export const useDeletePost = (id: string) => {
  const { showError, showSuccess } = useShowInfo();
  const deletePost = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/article/" + id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        showSuccess("Usunięto posta!");
      } else {
        showError("Nie udało się usunąć");
      }
    } catch (err) {
      showError("Wystąpił błąd podczas usuwania posta");
    }
  };
  return { deletePost };
};
