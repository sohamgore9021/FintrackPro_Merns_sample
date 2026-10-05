import { useState } from "react";
import { createContext } from "react";

export const MyStore = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [transactions, setTransactions] = useState([])


  return (
    <MyStore.Provider
      value={{
        accessToken,
        setAccessToken,
        loading,
        setLoading,
        user,
        setUser,
        transactions, setTransactions
      }}
    >
      {children}
    </MyStore.Provider>
  );
};
