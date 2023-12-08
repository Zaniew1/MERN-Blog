import { useShowInfo } from "../useShowInfo";
import { blogData } from "../../../public/data/data.js";
export const useResetPassword = (password: string, passwordConfirm: string) => {
  const { showError, showSuccess } = useShowInfo();
  const resetPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    if (!password || !passwordConfirm)
      return showError("Wymagane są hasła do resetu");
    if (
      !password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
    ) {
      return showError(
        "Hasło powinno zawierać minimum 8 znaków, 1 dużą literę, 1 małą i jeden znak specjalny"
      );
    }
    if (password !== passwordConfirm)
      return showError("Hasła nie są jednakowe");

    const response = await fetch(
      `${blogData.serverDomain}${window.location.pathname}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, passwordConfirm }),
      }
    );
    if (!response.ok)
      showError("Nie udało się zresetować hasła, spróbuj ponownie później!");
    else showSuccess("Zresetowano hasło!");
  };
  return { resetPassword };
};
