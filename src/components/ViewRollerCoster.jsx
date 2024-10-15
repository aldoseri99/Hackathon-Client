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

  return (
    <>
      {costers.map((coster) => (
        <div className="card1" onClick={() => selectCoster(coster.id)} key={coster.id}>
          <div className="img">
            <img src={coster.image} alt="coster Image" />
          </div>

          <div className="costerInfo">
            <h3>{coster.name}</h3>
            <p>{coster.location}</p>
          </div>

          <div className="cardRating">
            <h3>{coster.rating}</h3>
          </div>
        </div>
      ))}
    </>
  );
};

export default ViewRollerCoser;
