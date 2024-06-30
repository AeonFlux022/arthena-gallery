import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  authState: {
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    role: "",
    status: false,
  },
});
