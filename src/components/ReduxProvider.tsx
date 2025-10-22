"use client";

import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import MUIProvider from "./MUIProvider";

interface ReduxProviderProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  // Garantir que só renderiza no cliente para evitar problemas de SSR
  if (typeof window === "undefined") {
    return <div>Loading...</div>;
  }

  return (
    <Provider store={store}>
      <MUIProvider>{children}</MUIProvider>
    </Provider>
  );
}
