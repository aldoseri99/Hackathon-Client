import { useState, useEffect } from "react";
import { GetRollerCoaster } from "../services/costersServices";

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
    <div className="main-grid">
      {costers.map((coster) => (
        <div className="card1" onClick={() => selectCoster(coster.id)} key={coster.id}>
          <div className="img">
            <img className="img-card" src={`http://localhost:3001/uploads/${coster.image}`} alt="coster Image" />
          </div>

          <div className="costerInfo">
            <h3>{coster.name}</h3>
            <p className="cll">{coster.location}</p>
            <h3 className="rating">{coster.rating}</h3>
          
          </div>

          
        </div>
      ))}
    </div>
  );
};

export default ViewRollerCoser;
