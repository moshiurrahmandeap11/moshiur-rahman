import React from 'react';
import { AuthContext } from '../AuthContext/AuthContext';

const AuthProvider = ({children}) => {
    const userInfo = {

    }
    return <AuthContext value={userInfo}>{children}</AuthContext>
};

export default AuthProvider;