"use client";  // Required for Next.js App Router

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser, fetchUserProfile, registerUser } from "@/lib/api";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("token") : null
  );
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      fetchUserProfile(token).then(setUser);
    }
  }, [token]);

  const login = async (username: string, password: string) => {
    const response = await loginUser({ username, password });
    if (response?.access_token) {
      localStorage.setItem("token", response.access_token);
      setToken(response.access_token);
      const userProfile = await fetchUserProfile(response.access_token);
      setUser(userProfile);
      router.push("/dashboard"); // Redirect after login
    }
  };

  const register = async (username: string, email: string, password: string) => {
    await registerUser({ username, email, password });
    router.push("/auth/login"); // Redirect after registration
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
