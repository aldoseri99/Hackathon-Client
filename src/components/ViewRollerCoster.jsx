import { useState, useEffect } from 'react'
import { GetRollerCoaster } from '../services/costersServices'
import { Link } from 'react-router-dom'

const ViewRollerCoser = () => {
  const [costers, setCosters] = useState([])

  useEffect(() => {
    const handleCosters = async () => {
      const data = await GetRollerCoaster()
      setCosters(data)
    }
    handleCosters()
  }, [])

  const selectCoster = (id) => {
    console.log(`Coster selected with ID: ${id}`)
  }

  return (
    <div className="cardContainer">
      {costers.map((coster) => (
        <Link to={`/rollerCoaster/${coster._id}`} key={coster._id}>
          <div
            className="card1"
            onClick={() => selectCoster(coster.id)}
            key={coster.id}
          >
            <div className="img">
              <img
                src={`http://localhost:3001/uploads/${coster.image}`}
                alt="coster Image"
              />
            </div>

            <div className="costerInfo">
              <h3>{coster.name}</h3>
              <p>{coster.location}</p>
            </div>

            <div className="cardRating">
              <h3>{coster.rating}</h3>
            </div>
          </div>
        </Link>
      ))}
      <Link to={"/rollerCoaster/add"}>
        <div className="addcard">
          <h1>+</h1>
        </div>
      </Link>
    </div>
  )
}

export default ViewRollerCoser
