
import './App.css'
import Header from './components/header';
import Sidebar from './components/sidebar'
import { Outlet } from "react-router";


function App() {
  return (
    <>

      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <Outlet />
        </div>

      </div >
    </>
  )
}

export default App
