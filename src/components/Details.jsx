import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const Details = ({ rollerCoaster }) => {
  let navigate = useNavigate()

  let { rollerCoasterId } = useParams()
  const [rollerCoasterDetails, setRollerCoasterDetails] = useState(null)

  useEffect(() => {
    console.log("Roller Coaster Data:", rollerCoaster)
    console.log("Roller Coaster ID from URL:", rollerCoasterId)

    if (rollerCoaster.length > 0) {
      const selected = rollerCoaster.find(
        (rollerCoasterItem) => rollerCoasterItem._id === rollerCoasterId
      )
      setRollerCoasterDetails(selected || null)
    }
  }, [rollerCoaster, rollerCoasterId])

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:3001/rollerCoaster/${rollerCoasterId}`, {
        method: "DELETE",
      })
      navigate("/")
    } catch (error) {
      console.error("Error deleting roller coaster:", error)
    }
  }

  return rollerCoasterDetails ? (
    <div className="details-container">
      <img
        src={`http://localhost:3001/uploads/${rollerCoasterDetails.image}`}
        alt={rollerCoasterDetails.name}
        className="details-image"
      />
      <h1 className="details-title">{rollerCoasterDetails.name}</h1>
      <div className="details-info">
        <p className="details-description">
          {rollerCoasterDetails.description}
        </p>
        <p>
          <strong>Location:</strong> {rollerCoasterDetails.location}
        </p>
        <p>
          <strong>Speed:</strong> {rollerCoasterDetails.speed} mph
        </p>
        <p>
          <strong>Rating:</strong> {rollerCoasterDetails.rating}
        </p>
        <p>
          <strong>Manufacturer:</strong> {rollerCoasterDetails.manufacturer}
        </p>
      </div>
      <button onClick={handleDelete} className="delete">
        Delete
      </button>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default Details
