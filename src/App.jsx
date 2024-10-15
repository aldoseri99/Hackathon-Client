import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Nav from "./components/Nav"
import About from "./components/About"
import Add from "./components/Add"
import Details from "./components/Details"
import axios from "axios"
import "./App.css"

function App() {
  const [rollerCoaster, setRollerCoaster] = useState([])

  const [loading, setLoading] = useState(true)

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

  const [count, setCount] = useState(0)

  return (
    <div>
      <Nav />
      <main>
        {loading ? (
          <div>Loading...</div>
        ) : rollerCoaster.length > 0 ? (
          <Routes>
            <Route path="/about" element={<About />} />
            <Route
              path="/rollerCoaster/:rollerCoasterId"
              element={<Details rollerCoaster={rollerCoaster} />}
            />
          </Routes>
        ) : (
          <div>No roller coasters available.</div>
        )}
        <Add
          rollerCoaster={rollerCoaster}
          setRollerCoaster={setRollerCoaster}
        />
      </main>
    </div>
  )
}

export default App
