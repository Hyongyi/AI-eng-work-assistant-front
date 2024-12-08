import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: (access_token:string, useAge:string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// useAuth 훅: AuthContext에 접근하여 로그인 상태를 관리
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// AuthProvider 컴포넌트: children을 통해 자식 컴포넌트를 받음
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsLoggedIn(true); 
    }
  }, []);

  const login = (token:string, userAge:string) => {
    localStorage.setItem('jwt', token); // 로그인 시 JWT 저장
    localStorage.setItem('userAge', userAge)
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('jwt'); // 로그아웃 시 JWT 삭제
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
