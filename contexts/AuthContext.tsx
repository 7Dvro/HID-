import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('hid_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const saveUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem('hid_user', JSON.stringify(userData));
  };

  const login = async (email: string, pass: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Designated Admin Check
        if (email === 'mohemadmuzamil@gmail.com' && pass === 'admin@123') {
          saveUser({
            id: 'admin_001',
            name: 'محمد مزمل',
            email: email,
            role: 'admin',
            avatar: 'https://ui-avatars.com/api/?name=MM&background=D4AF37&color=fff',
            joinDate: new Date().toISOString()
          });
          resolve(true);
          return;
        }

        // Standard User Mock
        if (pass.length >= 6) {
          saveUser({
            id: 'user_' + Date.now(),
            name: email.split('@')[0],
            email: email,
            role: 'user',
            avatar: `https://ui-avatars.com/api/?name=${email}&background=006B3F&color=fff`,
            joinDate: new Date().toISOString()
          });
          resolve(true);
        } else {
          showToast('كلمة المرور غير صحيحة', 'error');
          resolve(false);
        }
      }, 1000);
    });
  };

  const register = async (name: string, email: string, pass: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
         saveUser({
            id: Date.now().toString(),
            name: name,
            email: email,
            role: 'user',
            joinDate: new Date().toISOString(),
            avatar: `https://ui-avatars.com/api/?name=${name}&background=006B3F&color=fff`
         });
         resolve(true);
      }, 1000);
    });
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        saveUser({
          id: 'google_123',
          name: 'Google User',
          email: 'user@gmail.com',
          role: 'user',
          avatar: 'https://ui-avatars.com/api/?name=Google+User&background=4285F4&color=fff',
          joinDate: new Date().toISOString()
        });
        resolve(true);
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hid_user');
    showToast('تم تسجيل الخروج بنجاح', 'info');
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      saveUser(updatedUser);
      showToast('تم تحديث الملف الشخصي بنجاح', 'success');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, loginWithGoogle, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};