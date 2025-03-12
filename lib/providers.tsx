"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createContext, useContext, useRef } from "react";
import { createUserStore, initUserStore, UserStore } from "./store";
import { useStore } from "zustand";

const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}

export const UserStoreContext = createContext<
  ReturnType<typeof createUserStore> | undefined
>(undefined);

export const UserStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const userRef = useRef<ReturnType<typeof createUserStore>>(null);
  if (!userRef.current) userRef.current = createUserStore(initUserStore());

  return (
    <UserStoreContext value={userRef.current}>{children}</UserStoreContext>
  );
};

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const userStoreContext = useContext(UserStoreContext);

  if (!userStoreContext) {
    throw new Error(`useUserStore must be used within UserStoreProvider`);
  }

  return useStore(userStoreContext, selector);
};
