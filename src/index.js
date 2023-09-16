import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from 'react-redux'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { userApi } from './slices/userApi';
const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
  reducer:{
    [userApi.reducerPath]: userApi.reducer
  },
  middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(userApi.middleware)
}
)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

