import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <header>
      <div className="headlogo">
        <Link to="/">
          <img src="../public/RideRadarLogo.png" alt="RideRadarLogo" />
        </Link>
      </div>
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/about"> About </Link>
        <Link to="/register"> Register </Link>
        <Link to="/signin"> Sign in </Link>
      </nav>
    </header>
  )
}
export default Nav
