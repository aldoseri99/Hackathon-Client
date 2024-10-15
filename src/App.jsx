import { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import Nav from "./components/Nav"
import About from "./components/About"
import Add from "./components/Add"
import axios from "axios"
import "./App.css"

function App() {
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

  return (
    <div>
      <Nav />
      <main>
        <Routes>
          <Route path="/about" element={<About />} />
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
