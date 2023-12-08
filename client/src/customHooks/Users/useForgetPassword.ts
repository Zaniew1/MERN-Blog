import { useShowInfo } from "../useShowInfo";
export const useForgetPassword = (email: string) => {
  const { showError, showSuccess } = useShowInfo();
  const forgetPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const response = await fetch(
      import.meta.env.VITE_API_URL + "forgetPassword",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    if (!response.ok) {
      showError("Nie udało się wysłać maila, spróbuj ponownie później!");
    } else {
      showSuccess("Wysłano maila resetującego, sprawdz pocztę!");
    }
  };
  return { forgetPassword };
};
