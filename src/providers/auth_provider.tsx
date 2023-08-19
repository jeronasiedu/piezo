import React, {useContext, useEffect, useState} from "react";
import {onAuthStateChanged, signOut as LogOut, User} from "@firebase/auth";
import Spinner from "../components/spinner.tsx";
import {auth} from "../config/firebase_config.ts";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from "firebase/auth";
import {AuthContext, AuthContextProps} from "../context/auth_context.ts";

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    const register = async (email: string, password: string) => {
        try {
            const {user} = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(user, {
                displayName: email.split('@')[0],
            });
            return user.uid;
        } catch (e) {
            console.log(e)
            throw e
        }
    }


    const login = async (email: string, password: string) => {
        try {
            const {user} = await signInWithEmailAndPassword(auth, email, password);
            return user.uid;
        } catch (e) {
            console.log(e)
            throw e
        }
    }

    const signOut = async () => {
        try {
            await LogOut(auth)
        } catch (e) {
            console.log(e);
            throw e;
        }
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });
        return () => unsubscribe();
    }, [auth]);


    return <AuthContext.Provider
        value={{
            signOut,
            user,
            login,
            register,
        }}
    >
        {loading ? <div className={'w-full min-h-screen flex items-center justify-center'}>
            <Spinner/>
        </div> : children}

    </AuthContext.Provider>

};

export const useAuth = (): AuthContextProps => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return authContext;
};
