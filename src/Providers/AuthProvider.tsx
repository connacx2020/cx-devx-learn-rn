import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

type User = null | {email: string; password: string};
const AuthUser: User = {
    email: 'admin@gmail.com',
    password: 'admin'
};
export const AuthContext = React.createContext<{
    errors: string;
    token: string;
    login: (email: string, password: string) => void;
    logout: () => void;
}>({
    errors: '',
    token: '',
    login: () => {},
    logout: () => {},
});

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [token, setToken] = useState<string | ''>('');
    const [errors,setError] = useState<string | ''>('');
    return (
        <AuthContext.Provider
            value={{
                token,
                errors,
                login: (email, password) => {
                    let devx_token: string = '';
                    if (AuthUser.email === email && AuthUser.password === password ) {
                        devx_token = 'Connacx Token';
                        setToken('Connacx Token');
                    }else{
                        setError('Incorrect Email or Password.');
                    }

                    AsyncStorage.setItem('devx_token', devx_token);
                },
                logout: () => {
                    setError('');
                    setToken('');
                    console.log('Logout');
                    AsyncStorage.removeItem('devx_token');
                },
            }}>
            {children}
        </AuthContext.Provider>
    );
};
