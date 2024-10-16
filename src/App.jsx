import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Nav from "./components/Nav"
import About from "./components/About"
import Add from "./components/Add"
import Details from "./components/Details"
import axios from "axios"
import SplashScreen from "./components/SplashScreen"
import Home from "./pages/Home"
import "./App.css"

import Register from "./pages/Register"
import SignIn from "./pages/Signin"
import { CheckSession } from "./services/Auth"
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

  const [showSplashscreen, setShowSplashscreen] = useState(
    () => !JSON.parse(localStorage.getItem("showedSplashscreen"))
  )

  useEffect(() => {
    setTimeout(() => {
      setShowSplashscreen(false)
      localStorage.setItem("showedSplashscreen", JSON.stringify(true))
    }, 4000)
  }, [])

  const getRollerCoaster = async () => {
    setLoading(true)
    try {
      const res = await axios.get("http://localhost:3001/rollerCoaster")
      setRollerCoaster(res.data)
    } catch (err) {
      console.error("Error fetching roller coasters:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getRollerCoaster()
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      checkToken()
    }
  }, [])
  return showSplashscreen ? (
    <SplashScreen />
  ) : (
    <div>
      <Nav user={user} handleLogOut={handleLogOut} />
      <main>
        {loading ? (
          <div>Loading...</div>
        ) : rollerCoaster.length > 0 ? (
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/rollerCoaster/:rollerCoasterId"
              element={<Details rollerCoaster={rollerCoaster} user={user} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/signin" element={<SignIn setUser={setUser} />} />
            <Route
              path="/rollerCoaster/add"
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
