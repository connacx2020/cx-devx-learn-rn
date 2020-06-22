import React, { useEffect, useContext } from 'react';
import { ActivityIndicator } from 'react-native';

import { AuthContext } from "../../Providers/AuthProvider";
import { Center } from '../../common/ultis/Center';

export const CxDevxLogout: React.FC = () => {
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        logout();
    })

    return (
        <Center>
            <ActivityIndicator size="large" />
        </Center>
    )
}
