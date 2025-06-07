
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/Login"
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/landing' element={<Landing></Landing>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

