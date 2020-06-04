import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useMutation } from '@apollo/react-hooks';
import { loginSchema } from '../common/graphQL';
import { from } from 'rxjs';


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
    isDarkTheme: Boolean;
    toggleTheme:()=>void;
}>({
    errors: '',
    token: '',
    isDarkTheme: false,
    login: () => { },
    logout: () => { },
    toggleTheme: () => { },
});

interface AuthProviderProps { }

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isDarkTheme,setIsDarkTheme] = React.useState<Boolean>(false);
    const [token, setToken] = useState<string | ''>('');
    const [errors, setError] = useState<string | ''>('');
    const [loginHook] = useMutation(loginSchema);

    return (
        <AuthContext.Provider
            value={{
                token,
                errors,
                isDarkTheme,
                login: ( email:string, password:string ) => {
                    let devx_token: string = '';
                    from(loginHook({ variables: { email, password } })).subscribe(
                        res => {
                            if (res.data.login !== null) {
                                console.log(res.data)
                                devx_token = res.data.login.token;
                                setToken(res.data.login.token);
                                AsyncStorage.setItem('devx_token', JSON.stringify({ token: devx_token, userID: res.data.login.id }));
                            } else {
                                setError('Incorrect Email or Password.');
                            }
                        },
                        err => {
                            console.log(err)
                        }
                    )

                },
                logout: () => {
                    setError('');
                    setToken('');
                    AsyncStorage.removeItem('devx_token');
                },
                toggleTheme: () => {
                    setIsDarkTheme( isDarkTheme => !isDarkTheme );
                }
            }}>
            {children}
        </AuthContext.Provider>
    );
};
