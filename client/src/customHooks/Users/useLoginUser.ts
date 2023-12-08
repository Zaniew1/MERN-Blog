import { useContext } from "react";
import { blogData } from "../../../public/data/data.js";
import { AuthContext } from "../../store/Auth-context";
import { UserType, LoginDataType } from "../../types/blogTypes";
import { useShowInfo } from "../useShowInfo";

export const useLoginUser = (data: { email: string; password: string }) => {
  const { showError, showSuccess } = useShowInfo();
  const { setloggedIn, setUserData } = useContext(AuthContext);
  const LoginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data.email === "") return showError("Email jest wymagany");
    if (
      !data.password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      )
    ) {
      return showError(
        "Hasło powinno zawierać minimum 8 znaków, 1 dużą literę, 1 małą i jeden znak specjalny"
      );
    }
    const response = await fetch(blogData.serverDomain + "/loginUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
      body: JSON.stringify(data),
      // credentials: 'include'
    });
    if (!response.ok) {
      showError("Logowanie nie udane!");
    } else {
      setloggedIn(true);
      showSuccess("Udało się zalogować!");
    }
    const user: LoginDataType = await response.json();
    document.cookie = user.token as string;
    setUserData(user.data as UserType);
  };
  return { LoginUser };
};
