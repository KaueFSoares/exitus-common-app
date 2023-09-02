import { createContext } from "react";
import { AuthData } from "../service/auth.service";

const AuthContext = createContext<{
    auth: AuthData,
    handleOnLogin: (email: string, password: string) => void,
}>({
    auth: {} as AuthData,
    handleOnLogin: () => { }
});

export default AuthContext;