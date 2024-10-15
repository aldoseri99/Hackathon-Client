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

  return (
    <div className="cardContainer">
      {costers.map((coster) => (
        <Link to={`/rollercoaster/${coster._id}`} key={coster._id}>
          <div className="card1">
            <div className="img">
              <img src={coster.image} alt="coster Image" />
            </div>

            <div className="costerInfo">
              <h3>{coster.name}</h3>
              <h3>{coster._id}</h3>
              <p>{coster.location}</p>
            </div>

            <div className="cardRating">
              <h3>{coster.rating}</h3>
            </div>
          </div>
        </Link>
      ))}
      <Link to={'/Add'}>
        <div className="card1">
          <h1>+</h1>
        </div>
      </Link>
    </div>
  )
}

export default ViewRollerCoser
