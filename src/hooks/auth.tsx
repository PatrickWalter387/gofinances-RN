import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session';

import { CLIENT_ID, REDIRECT_URI } from 'react-native-dotenv';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props{
    children: ReactNode
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface AuthorizationResponse {
    params: {
        access_token: string;
    }
    type: string;
}

interface IAuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
    signOut(): Promise<void>;
    isLoggingIn: boolean;
    userStorageLoading: boolean;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children} : Props){
    const [user, setUser] = useState({} as User);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [userStorageLoading, setUserStorageLoading] = useState(true);

    async function signInWithGoogle(){
        setIsLoggingIn(true);
        try{
            const RESPONSE_TYPE = "token";
            const SCOPE = encodeURI("profile email");

            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

            const { params, type } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

            if (type === 'success') {
                const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
                const userInfo = await response.json();

                const userLoggedIn = {
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.given_name,
                    photo: userInfo.picture
                }

                setUser(userLoggedIn);
                await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLoggedIn));
            }
        }
        catch(error){
            throw new Error(error as string);
        }
        finally{
            setIsLoggingIn(false);
        }
    }

    async function signOut(){
        setUser({} as User);
        await AsyncStorage.removeItem('@gofinances:user');
    }

    useEffect(() => {
        async function loadUserStorageData() {
            const userStoraged = await AsyncStorage.getItem('@gofinances:user');

            if (userStoraged) {
                const userLogged = JSON.parse(userStoraged) as User;
                setUser(userLogged);
            }

            setUserStorageLoading(false);
        }

        loadUserStorageData();
    }, [])

    return(
        <AuthContext.Provider value={{ user, signInWithGoogle, signOut, isLoggingIn, userStorageLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(){
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth }