import { create } from "zustand";
import { User } from "../types/user";

interface UserStoreProps {
    user: User | null,
    setUser: (user: User) => void
}

export const useSessionStore = create<UserStoreProps>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}))