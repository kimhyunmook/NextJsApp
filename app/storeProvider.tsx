'use client'
import {store, persistedStore} from '@/lib/store/store'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";

// export let persistor = persistStore(store);
export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        {children}
      </PersistGate>
    </Provider>
    )
}