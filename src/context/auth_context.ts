import {User} from "@firebase/auth";
import {createContext} from "react";

export type AuthContextProps = {
    user: User | null,
    login: (email: string, password: string) => Promise<string>,
    register: (email: string, password: string) => Promise<string>,
    signOut: () => Promise<void>,
}

export const AuthContext = createContext<AuthContextProps>({
        user: null,
        login: async (_: string, __: string) => {
            return ''
        },
        register: async (_: string, __: string) => {
            return ''
        },

        signOut: async () => {
        },
    }
);
