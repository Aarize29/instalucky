import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Home from './pages/Home'
import Paymentfailure from './pages/Paymentfailure'
import Posts from './pages/Posts'
function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/posts" element={<Posts/>} />
          <Route path="/paymentfailure" element={<Paymentfailure/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Landing />} />
        </Routes>
      </Router>
    </>

  )
}

export default App
