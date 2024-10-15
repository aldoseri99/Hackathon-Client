import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import About from './components/About'
import Add from './components/Add'
import Details from './components/Details'
import axios from 'axios'
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

  const [loading, setLoading] = useState(true)

  const getRollerCoaster = async () => {
    setLoading(true)
    try {
      const res = await axios.get('http://localhost:3001/rollerCoaster')
      setRollerCoaster(res.data)
    } catch (err) {
      console.error('Error fetching roller coasters:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getRollerCoaster()
  }, [])

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
        {loading ? (
          <div>Loading...</div>
        ) : rollerCoaster.length > 0 ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/rollerCoaster/:rollerCoasterId"
              element={<Details rollerCoaster={rollerCoaster} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<SignIn setUser={setUser} />} />
            <Route
              path="/Add"
              element={
                <Add
                  rollerCoaster={rollerCoaster}
                  setRollerCoaster={setRollerCoaster}
                />
              }
            />
          </Routes>
        ) : (
          <div>No roller coasters available.</div>
        )}
      </main>
    </div>
  )
}

export default App
