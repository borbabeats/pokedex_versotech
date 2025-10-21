'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import MUIProvider from './MUIProvider';

interface ReduxProviderProps {
  children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <MUIProvider>
        {children}
      </MUIProvider>
    </Provider>
  );
}
