import { createContext } from "react";

// AuthProps Interface
interface AuthProps {
  authState?: {
    token: string | null;
    authenticated: boolean | null;
    user: any;
  };
  onRegister?: (
    email: string,
    password: string,
    username: string
  ) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({
  authState: { token: null, authenticated: null, user: null },
  onRegister: async () => {},
  onLogin: async () => {},
  onLogout: async () => {},
});
export default AuthContext;
