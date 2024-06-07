import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  FC,
} from "react";

interface AuthContextType {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  isLoged: boolean;
  setIsLoged: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProviders: FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoged, setIsLoged] = useState<boolean>(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoged(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const logout = () => {
    setUser(null);
    setIsLoged(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoged, setIsLoged, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
