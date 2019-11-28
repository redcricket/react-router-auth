import {createContext, useContext} from 'react';

/*
interface AuthTokens{
    key: string
}

interface AuthCtx{
    authTokens: AuthTokens;
    setAuthTokens: (authTokens:AuthTokens) => void;
}
 */

export const AuthContext = createContext(null);  //type: AuthCtx | null

export function useAuth() {
    return useContext(AuthContext);
}