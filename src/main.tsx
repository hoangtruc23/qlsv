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
import EnterScore from './pages/enter_score.tsx';
import { store } from './store.ts';
import { Provider } from 'react-redux';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ManageClasses from './pages/manage-classes.tsx';
import RegisterUser from './pages/register-user.tsx';
import ProfilePage from './pages/profile.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Admin routes
      {
        path: "admin",
        children: [
          { index: true, Component: AdminPage },
          { path: "manage-subject", Component: ManageSubject },
          { path: "manage-student", Component: ManageStudent },
          { path: "manage-classes", Component: ManageClasses },
          { path: "register-user", Component: RegisterUser },

        ],
      },
      {
        path: "profile",
        children: [
          { index: true, Component: ProfilePage },

        ],
      },
      {
        path: "teacher",
        children: [
          { path: "enter_score", Component: EnterScore },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </Provider>
  </StrictMode>,
)
