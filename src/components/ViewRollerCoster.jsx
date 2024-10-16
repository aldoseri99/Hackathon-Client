import { useState, useEffect } from 'react'
import { GetRollerCoaster } from '../services/costersServices'
import { Link } from 'react-router-dom'
import { GetLocation } from '../services/locationServices'

const ViewRollerCoser = ({ user }) => {
  const [coasters, setCoasters] = useState([])
  const [filteredCoasters, setFilteredCoasters] = useState([])
  const [locations, setLocations] = useState([])
  const [sortOption, setSortOption] = useState('none_asc')

  useEffect(() => {
    const handleCoasters = async () => {
      const data = await GetRollerCoaster()
      setCoasters(data || [])
      setFilteredCoasters(data)
    }

    const handleLocation = async () => {
      const locationData = await GetLocation()
      setLocations(locationData)
    }

    handleCoasters()
    handleLocation()
  }, [])

  const getSortedFilteredCoasters = () => {
    let sortedCoasters = [...filteredCoasters]

    if (sortOption === 'none_asc') return sortedCoasters

    const [criteria, order] = sortOption.split('_')

    sortedCoasters.sort((a, b) => {
      let comparison = 0
      if (criteria === 'rating') {
        comparison = b.rating - a.rating
      }
      return order === 'asc' ? comparison : -comparison
    })

    return sortedCoasters
  }

  const handleFilter = (locationId) => {
    if (locationId === null) {
      setFilteredCoasters(coasters)
    } else {
      const filtered = coasters.filter(
        (coaster) => coaster.location.country === locationId
      )
      setFilteredCoasters(filtered)
    }
  }

  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }

  return (
    <div>
      <h2>Filter by Location</h2>
      <div>
        <button onClick={() => handleFilter(null)}>Show All</button>
        {locations.map((location) => (
          <button
            key={location._id}
            onClick={() => handleFilter(location.country)}
          >
            {location.country}
          </button>
        ))}
      </div>

      <h2>Sort by</h2>
      <select onChange={handleSortChange} value={sortOption}>
        <option value="none_asc">None</option>
        <option value="rating_asc">Rating Ascending</option>
        <option value="rating_desc">Rating Descending</option>
      </select>

      <div className="main-grid">
        {Array.isArray(getSortedFilteredCoasters()) &&
          getSortedFilteredCoasters().map((coster) => (
            <Link to={`/rollerCoaster/${coster._id}`} key={coster._id}>
              <div className="card1">
                <div className="img-card">
                  <img
                    src={`http://localhost:3001/uploads/${coster.image}`}
                    alt="coaster Image"
                  />
                </div>

                <div className="costerInfo">
                  <h3>{coster.name}</h3>
                  <p className="cll">
                    {coster.location.country}, {coster.location.park}
                  </p>

                </div>
                <div>
                  <h3 className="rating">
                    <i className="fa-solid fa-star"></i>
                    {coster.rating}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        {user ? (
          <Link to={'/rollerCoaster/add'}>
            <div className="addcard card1">
              <h1>+</h1>
            </div>
          </Link>
        ) : null}
      </div>
    </div>
  )
}
export default ViewRollerCoser
