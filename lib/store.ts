import { FormValues } from "@/components/ReactHookForm";
import { create } from "zustand";

type UserState = Omit<FormValues, "experience"> & {
  updateUser: (user: FormValues) => void;
};
export const useUserStore = create<UserState>()((set) => ({
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  other: "",
  experience: "",
  updateUser: (user: FormValues) =>
    set({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      other: user.other,
      password: user.password,
    }),
}));
