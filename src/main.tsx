import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import './index.css'
import App from './App.tsx'
import Login from './pages/login.tsx';
import AdminPage from './pages/admin-page.tsx';
import ManageSubject from './pages/manage-subject.tsx';
import ManageStudent from './pages/manage-students.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "admin", Component: AdminPage },
      { path: "admin/manage-subject", Component: ManageSubject },
      { path: "admin/manage-student", Component: ManageStudent },
    ],
  },
  {
    path: "/admin",
    element: <AdminPage />,
    children: [
      // { index: true, Component: Home },
      { path: "manage-subject", Component: ManageSubject },
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} ></RouterProvider>
  </StrictMode>,
)
