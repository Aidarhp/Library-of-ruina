import { createContext, useState } from "react";

export const CustomContext = createContext();

const Context = (props) => {
  const [registrate, setRegistrate] = useState("log");
  const [searchQuery, setSearchQuery] = useState("");

  const value = {
    setSearchQuery,
    setRegistrate,
    registrate,
    searchQuery
  };
  return (
    <CustomContext.Provider value={value}>
      {props.children}
    </CustomContext.Provider>
  );
};

export default Context;
