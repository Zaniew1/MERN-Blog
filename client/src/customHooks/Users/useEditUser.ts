import { EditUserType } from "../../types/blogTypes";
import { useContext } from "react";
import { AuthContext } from "../../store/Auth-context";
import { useShowInfo } from "../useShowInfo";
export const useEditUser = (dataUser: EditUserType) => {
  const { userData } = useContext(AuthContext);
  const { showError, showSuccess } = useShowInfo();
  const editUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.set("id", userData.id as string);
    data.set("name", dataUser.name);
    data.set("surname", dataUser.surname);
    data.set("avatar", dataUser.avatar ?? "");
    const response = await fetch(import.meta.env.VITE_API_URL + "editUser", {
      method: "POST",
      body: data,
    });
    if (!response.ok) {
      showError("Edycja nie udana, spróbuj ponownie później!");
    } else {
      showSuccess("Udało się edytować użytkownika!");
      const user = await response.json();
      console.log(user);
    }
  };
  return { editUser };
};
