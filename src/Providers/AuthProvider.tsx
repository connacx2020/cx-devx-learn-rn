import React, { useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useMutation } from '@apollo/react-hooks';
import { loginSchema } from '../common';
import { from } from 'rxjs';

export const AuthContext = React.createContext<{
    errors: string;
    token: string;
    login: (email: string, password: string) => void;
    logout: () => void;
}>({
    errors: '',
    token: '',
    login: () => { },
    logout: () => { },
});

interface AuthProviderProps { }

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | ''>('');
    const [errors, setError] = useState<string | ''>('');
    const [loginHook] = useMutation(loginSchema);

    return (
        <AuthContext.Provider
            value={{
                token,
                errors,
                login: (email, password) => {
                    let devx_token: string = '';
                    from(loginHook({ variables: { email, password } })).subscribe(
                        res => {
                            if (res.data.login !== null) {
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
                    // console.log('Logout');
                    AsyncStorage.removeItem('devx_token');
                },
            }}>
            {children}
        </AuthContext.Provider>
    );
};
