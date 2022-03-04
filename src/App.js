import React from 'react';
import IndexRouter from './router/IndexRouter';
import { Provider } from 'react-redux'
import { store, persiststore } from './redux/store'
import './App.css'
import { PersistGate } from 'redux-persist/integration/react'

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persiststore}>
        <IndexRouter />
      </PersistGate>
    </Provider>
  )
}

