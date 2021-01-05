import React, { useEffect, useContext } from 'react';
import { ActivityIndicator, DevSettings } from 'react-native';

import { AuthContext } from "../../Providers/AuthProvider";
import { Center } from '../../common/ultis/Center';

export const CxDevxLogout: React.FC = () => {
    const { logout } = useContext(AuthContext);

    useEffect(() => {
        logout();
        DevSettings.reload()
    }, [])

    return (
        <Center>
            <ActivityIndicator size="large" />
        </Center>
    )
}
