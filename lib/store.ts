import { FormValues } from "@/components/ReactHookForm";
import { createStore } from "zustand";

export type UserState = Omit<FormValues, "experience"> & {
  experience: string;
  language: string;
};

export type UserStore = typeof initialState & {
  updateUser: (user: FormValues) => void;
  updateLanguage: (language: string) => void;
};

export const initialState: UserState = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  other: "",
  experience: "",
  language: "",
};

export const initUserStore = (): UserState => initialState;

export const createUserStore = (initState: UserState = initialState) =>
  createStore<UserStore>()((set) => ({
    ...initState,
    updateUser: (user: FormValues) =>
      set({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        other: user.other,
        password: user.password,
        experience: user.experience,
      }),
    updateLanguage: (language: string) =>
      set((state) => ({
        ...state,
        language,
      })),
  }));
