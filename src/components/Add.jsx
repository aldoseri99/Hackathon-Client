import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { GetLocation } from '../services/locationServices'

const Add = ({ rollerCoaster, setRollerCoaster }) => {
  const [locations, setLocations] = useState([])
  let navigate = useNavigate()

  useEffect(() => {
    const handleLocation = async () => {
      const data = await GetLocation()
      setLocations(data)
    }
    handleLocation()
  }, [])

  const initialState = {
    name: '',
    speed: '',
    description: '',
    image: null,
    rating: '',
    type: '',
    manufacturer: ''
  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
    console.log(formValues)
  }

  const handleFileChange = (e) => {
    setFormValues({ ...formValues, image: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()

    for (const key in formValues) {
      if (key === 'image') {
        formData.append('image', formValues[key]) // Append the file separately

      } else {
        formData.append(key, formValues[key])
      }
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/rollerCoaster',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      console.log('Form and file uploaded successfully:', response.data)

      setRollerCoaster([...rollerCoaster, response.data])
      setFormValues(initialState)
      navigate('/')
    } catch (error) {
      console.error('Error uploading form and file:', error)
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
        <select onChange={handleChange} name="" id="location">
          <option disabled selected value=""></option>
          <option value="test">testn</option>
          {locations.map((location) => (
            <option value={location._id}>
              {location.country}, {location.park}
            </option>
          ))}
        </select>
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
        <select id="rating" onChange={handleChange} value={formValues.rating}>
          <option value="1"> 1</option>
          <option value="2"> 2</option>
          <option value="3"> 3</option>
          <option value="4"> 4</option>
          <option value="6"> 6</option>
          <option value="7"> 7</option>
          <option value="8"> 8</option>
          <option value="9"> 9</option>
          <option value="10"> 10</option>
        </select>

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
