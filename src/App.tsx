
import './App.css'
import Sidebar from './components/sidebar'
// import AdminPage from './pages/admin-page'
// import Login from './pages/login'
import { Outlet } from "react-router";

function App() {

  return (
    <div className="flex gap-5">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default App
