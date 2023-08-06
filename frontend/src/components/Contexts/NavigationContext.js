import { createContext, useState } from "react";

export const NavigationContext = createContext();

export const CustomNavigationContextProvider = ({ children }) => {
    const [redirectTo, setRedirectTo] = useState("/");

  return (
    <NavigationContext.Provider value={{ redirectTo, setRedirectTo }}>
      {children}
    </NavigationContext.Provider>
  );
};