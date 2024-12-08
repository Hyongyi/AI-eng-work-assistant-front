import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom";
import Router from './Router';
import { AuthProvider } from './components/AuthContext';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <AuthProvider>
    <RouterProvider router={Router} />
  </AuthProvider>
);


