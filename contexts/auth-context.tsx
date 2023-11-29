'use client'

import { ReactNode, createContext, FC, useEffect, useState, useCallback, useMemo } from "react";
import { User } from "@/types/user";
import { getCookie } from "@/utils/get-cookie";
import {login as authLogin, logout as authLogout} from '@/backend-api/auth-api'

const authCookieName = "gosnagrada-cookie";

interface State {
  user: User | null;
}

type UpdateUserCallback = (prev: User | null) => User | null;

export interface AuthContextValue extends State {
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: (User | null) | UpdateUserCallback) => void;
}

const initialState: State = {
  user: null,
};

const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  updateUser: (prev => prev)
});

const storeUser = (user: User) => {
  globalThis.localStorage.setItem('user', JSON.stringify(user))
}

const restoreUser = (): User | null => {
  let user: User | null = null;
  try {
    const storedData: string | null = globalThis.localStorage.getItem('user')
    if (storedData) {
      user = JSON.parse(storedData)
    } else {
      user = null;
    }
    
  } catch (err) {
    // If stored data is not a stringified JSON this will fail,
    // that's why we catch the error
    console.error(err)
  }
  
  if (user) {
    user.createdAt = new Date(user.createdAt)
    user.modifiedAt = new Date(user.modifiedAt)
  }
  
  return user;
}

const removeUserFromLocalStorage = () => {
  globalThis.localStorage.removeItem('user')
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = (props) => {
  const {children} = props;
  const [user, setUser] = useState<User | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  
  useEffect(() => {
    const initialize = async (): Promise<void> => {
      const authCookie = getCookie(authCookieName);
      const user = restoreUser()
      
      if (authCookie && user) {
        setUser(user)
        setIsInitialized(true)
      } else {
        setUser(null)
        setIsInitialized(true)
      }
    };

    initialize().catch(console.error)
  }, []);
  
  useEffect(() => {
    if (user) {
      storeUser(user)
    }
  }, [user]);

  const updateUser = useCallback((updateUserCallback: (User | null) | UpdateUserCallback) => {
    setUser(updateUserCallback)
  }, [])
  
  const login = useCallback(async (username: string, password: string) => {
    const userResponse = await authLogin({username, password});
    setUser(userResponse)
  }, [])

  const logout = useCallback(async (): Promise<void> => {
    await authLogout();
    setUser(null)
    removeUserFromLocalStorage()
  }, [])
  
  const contextValue = useMemo(() => ({
    user,
    login,
    logout,
    updateUser,
  }), [user, login, logout, updateUser])
  
  if (!isInitialized) {
    return null
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export {
  AuthContext,
  AuthProvider,
}


