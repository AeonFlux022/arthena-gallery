import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  id: "",
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  role: "",
  status: false,
});
