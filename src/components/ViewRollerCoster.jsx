const ViewRollerCoser = ({ costers = [], selectCoster }) => {
  return (
    <>
      {costers.map((coster) => (
        <div className="card" onClick={() => selectCoster(coster.id)} key={coster.id}>
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
