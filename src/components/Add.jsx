import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const Add = ({ rollerCoaster, setRollerCoaster }) => {
  let navigate = useNavigate()

  const initialState = {
    name: "",
    location: "",
    speed: "",
    description: "",
    image: null,
    rating: "",
    type: "",
    manufacturer: "",
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const handleFileChange = (e) => {
    setFormValues({ ...formValues, image: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    // Append all form values
    for (const key in formValues) {
      if (key === "image") {
        formData.append("image", formValues[key]) // Append the file separately
      } else {
        formData.append(key, formValues[key])
      }
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/rollerCoaster",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      console.log("Form and file uploaded successfully:", response.data)

      setRollerCoaster([...rollerCoaster, response.data])
      setFormValues(initialState)
      navigate("/about")
    } catch (error) {
      console.error("Error uploading form and file:", error)
    }
  }

  return (
    <div>
      <h2>Add Roller Coaster</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          onChange={handleChange}
          value={formValues.name}
        />
        <label htmlFor="description">Description: </label>
        <input
          type="text"
          id="description"
          onChange={handleChange}
          value={formValues.description}
        />
        <label htmlFor="location">Location: </label>
        <input
          type="text"
          id="location"
          onChange={handleChange}
          value={formValues.location}
        />
        <label htmlFor="speed">Speed: </label>
        <input
          type="number"
          id="speed"
          onChange={handleChange}
          value={formValues.speed}
        />
        <label htmlFor="type">Type of Roller Coaster:</label>
        <select id="type" onChange={handleChange} value={formValues.type}>
          <option value="wooden"> Wooden Coaster</option>
          <option value="steel">Steel Coaster</option>
          <option value="inverted">Inverted Coaster</option>
          <option value="looping">Looping Coaster</option>
          <option value="hybird">Hybird Coaster</option>
        </select>
        <label htmlFor="image">Image: </label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
        />
        <label htmlFor="rating">Rate: </label>
        <input
          type="number"
          id="rating"
          onChange={handleChange}
          value={formValues.rating}
        />
        <label htmlFor="manufacturer">Manufacturer: </label>
        <input
          type="text"
          id="manufacturer"
          onChange={handleChange}
          value={formValues.manufacturer}
        />

        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default Add
