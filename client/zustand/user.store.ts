import { create } from "zustand";
import { persist } from "zustand/middleware";

type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  avater: string;
  phone:string;
};

type IUserStore = {
  user: IUser | null;
  setLogout: () => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (type: boolean) => void;
  setUser: (user: IUser) => void;
};

export const useUserStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setIsAuthenticated: (type: boolean) => set({ isAuthenticated: type }),
      setUser: (user: IUser) => set({ user: user }),
      setLogout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "user-storage",
    }
  )
);
