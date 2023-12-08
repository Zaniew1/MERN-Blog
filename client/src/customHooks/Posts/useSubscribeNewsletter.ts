import { useShowInfo } from "../useShowInfo";
export const useSubscribeNewsletter = (email: string) => {
  const { showError, showSuccess } = useShowInfo();
  const subscribeNewsletter = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const response = await fetch(import.meta.env.VITE_API_URL + "/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      showError("Nie udało się zasubskrybować, spróbuj ponownie później!");
    } else {
      showSuccess("Zasubskrybowano, oczekuj na nowe posty!");
    }
  };
  return { subscribeNewsletter };
};
