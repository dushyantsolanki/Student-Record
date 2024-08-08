import { createContext, useContext } from "react";

const authContext = createContext({});

export const AuthContextProvider = authContext.Provider;

export const useAuthContext = () => {
  return useContext(authContext);
};
