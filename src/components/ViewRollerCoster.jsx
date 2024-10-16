import { useState, useEffect } from "react"
import { GetRollerCoaster } from "../services/costersServices"
import { Link } from "react-router-dom"

const ViewRollerCoser = ({ user }) => {
  const [costers, setCosters] = useState([])
  const [sortOption, setSortOption] = useState("none_asc")


  useEffect(() => {
    const handleCosters = async () => {
      const data = await GetRollerCoaster()
      setCosters(data || [])
    }
    handleCosters()
  }, [])

  const sortedCosters = () => {
    if (sortOption === "none_asc") return costers
    const [criteria, order] = sortOption.split("_")

    return [...costers].sort((a, b) => {
      let comparison = 0
      if (criteria === "rating") {
        comparison = a.rating - b.rating
      }

      return order === "asc" ? comparison : -comparison
    })
  }

  const selectCoster = (id) => {
    console.log(`Coster selected with ID: ${id}`)
  }

  return (
    <>
      <div className="select-container">
        <select
          onChange={(e) => setSortOption(e.target.value)}
          value={sortOption}
          className="select-dropdown"
        >
          <option value="none_asc">Show All</option>
          <option value="rating_asc">Sort by Rating (Low to High)</option>
          <option value="rating_desc">Sort by Rating (High to Low)</option>
        </select>
      </div>

      <div className="main-grid">
        {Array.isArray(sortedCosters()) &&
          sortedCosters().map((coster) => (
            <Link to={`/rollerCoaster/${coster._id}`} key={coster._id}>
              <div
                className="card1"
                onClick={() => selectCoster(coster.id)}
                key={coster.id}
              >
                <div className="img-card">
                  <img
                    src={`http://localhost:3001/uploads/${coster.image}`}
                    alt="coster Image"
                  />
                </div>

                <div className="costerInfo">
                  <h3>{coster.name}</h3>
                  <p className="cll">{coster.location}</p>
                </div>
            <div>
              <h3 className='rating'> <i className="fa-solid fa-star"></i>{coster.rating}</h3>
            </div>
          </div>
        </Link>
      ))}
      <Link to={"/rollerCoaster/add"}>
        <div className="addcard card1">
          <h1>+</h1>
        </div>
      </Link>
    </div>
    </>
  )
}

export default ViewRollerCoser
