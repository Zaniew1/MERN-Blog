import { useContext } from "react";
import { blogData } from "../../../public/data/data.js";
import { AuthContext } from "../../store/Auth-context";
import { CreateUserType } from "../../types/blogTypes";
import { useShowInfo } from "../useShowInfo";
export const useCreateUser = (userData: CreateUserType) => {
  const { setloggedIn } = useContext(AuthContext);
  const { showError, showSuccess } = useShowInfo();
  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (userData.email === "") return showError("Email jest wymagany");
      if (userData.name === "") return showError("Imię jest wymagany");
      if (userData.surname === "") return showError("Nazwisko jest wymagane");
      if (
        userData.name.length > 12 ||
        userData.name.length < 3 ||
        userData.surname.length > 15 ||
        userData.surname.length < 3
      )
        return showError(
          "Nazwisko i imię powinny mieć min 3 znaki i max 15 znaków "
        );
      if (
        !userData.password.match(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        )
      )
        return showError(
          "Hasło powinno zawierać minimum 8 znaków, 1 dużą literę, 1 małą i jeden znak specjalny"
        );
      const response = await fetch(blogData.serverDomain + "createNewUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        // credentials: 'include'
      });
      if (!response.ok) {
        showError("Nie udało się stworzyć użytkownika");
      } else {
        setloggedIn(true);
        showSuccess("Udało się stworzyć użytkownika!");
      }
      const user = await response.json();
      console.log(user);
    } catch (err) {
      showError("Nie udało się stworzyć użytkownika");
    }
  };
  return { createUser };
};
