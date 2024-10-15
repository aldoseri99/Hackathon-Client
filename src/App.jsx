
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import About from './components/About'
import axios from "axios"
import Home from './pages/Home'
import './App.css'

import Register from './pages/Register'
import SignIn from './pages/Signin'
import { CheckSession } from './services/Auth'
function App() {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  const [rollerCoaster, setRollerCoaster] = useState([])

  /* const getRollerCoaster = async () => {
    try {
      let res = await axios.get("http://localhost:3001/rollerCoaster")
      setRollerCoaster(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getRollerCoaster()
  }, [])*/

  const [count, setCount] = useState(0)


  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      checkToken()
    }
  }, [])
  return (
    <div>
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
        </Routes>
        <Add
          rollerCoaster={rollerCoaster}
          setRollerCoaster={setRollerCoaster}
        />
      </main>
    </div>
  )
}

export default App
