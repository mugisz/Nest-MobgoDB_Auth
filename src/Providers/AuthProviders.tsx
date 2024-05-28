import React, {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface AuthContextType {
  user: any;
}

const AuthContext = createContext<any>({ user: null });

export const AuthProviders: FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Auth Context in err");
  return context;
};
