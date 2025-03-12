import { FormValues } from "@/components/ReactHookForm";
import { createStore } from "zustand";

export type UserState = Omit<FormValues, "experience"> & {
  experience: string;
};

export type UserStore = typeof initialState & {
  updateUser: (user: FormValues) => void;
};

export const initialState: UserState = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  other: "",
  experience: "",
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
      }),
  }));
