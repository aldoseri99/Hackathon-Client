import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../services/api'
import ViewRollerCoser from '../components/ViewRollerCoster'

const Home = ({ user }) => {
  const [rollerCoster, setRollerCoster] = useState([])
  console.log(user)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}`)
        setRollerCoster(response.data.results)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="test">
      <div className="Cards">
        <section className="rpllerCards">
          <ViewRollerCoser user={user} rollerCoster={rollerCoster} />
        </section>
      </div>
    </div>
  )
}

export default Home
