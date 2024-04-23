'use client'
import store from '@/lib/store/store'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export let persistor = persistStore(store);
export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
    )
}