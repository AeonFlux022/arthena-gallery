import { createContext } from "react";

export const AuthContext = createContext({
  id: "",
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  role: "",
  status: false,
});
