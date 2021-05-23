import React from "react";
import { ActionL } from "./DataContext/ActionL";
export const Context = React.createContext();

const ContextProvider = ({ children }) => {
  const dataL = ActionL();
  return <Context.Provider value={dataL}>{children}</Context.Provider>;
};
export default ContextProvider;
