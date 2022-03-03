import React from 'react';
import IndexRouter from './router/IndexRouter';
import { Provider } from 'react-redux'
import store from './redux/store'
import './App.css'

export default function App() {
  return (
    <Provider store={store}>
      <IndexRouter />
    </Provider>
  )
}

