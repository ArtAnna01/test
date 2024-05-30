import { create } from "zustand";
import { User } from "../types";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  registeredUsers: User[];
  registerUser: (user: User) => void;
  loginUser: (email: string, password: string) => boolean;
  logoutUser: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    immer((set, get) => ({
      user: null,
      isAuthenticated: false,
      registeredUsers: [],
      registerUser: (user) =>
        set((state) => {
          state.registeredUsers.push(user);
        }),
      loginUser: (email, password) => {
        const { registeredUsers } = get();
        const user = registeredUsers.find(
          (user) => user.email === email && user.password === password
        );
        if (user) {
          set((state) => {
            state.user = user;
            state.isAuthenticated = true;
          });
          return true;
        }
        return false;
      },
      logoutUser: () =>
        set((state) => {
          state.user = null;
          state.isAuthenticated = false;
        }),
    })),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;
