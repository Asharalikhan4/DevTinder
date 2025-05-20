"use client";
import { userProfile } from "@/actions/user";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/globalTypes";

interface AuthContextType {
  user: User | null; // Allow user to be null
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Allow setUser to accept null
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!user) {
      userProfile()
        .then(data => setUser(data.user))
        .catch(() => setUser(null));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};