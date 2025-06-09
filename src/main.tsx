import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";

import './index.css'
import App from './App.tsx'
import AdminPage from './pages/dashboard/admin/admin-page.tsx';
import ManageSubject from './pages/subject/manage-subject.tsx';
import ManageStudent from './pages/student/manage-students.tsx';
import { store } from './store.ts';
import { Provider } from 'react-redux';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ManageClasses from './pages/classes/manage-classes.tsx';
import RegisterUser from './pages/auth/register-user.tsx';
import ProfilePage from './pages/auth/profile.tsx';
import Login from './pages/auth/login.tsx';
import EnterScore from './pages/grades/enter_score.tsx';

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
