import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import Nav from "./components/Nav"
import About from "./components/About"
import "./App.css"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Nav />
      <main>
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
