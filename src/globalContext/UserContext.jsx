import { createContext, useContext, useState } from "react";

export const UserContext = createContext({
  userName: null,
  setUserName: () => {},
});

const useGlobalUserContext = () => useContext(UserContext);

export default useGlobalUserContext;
