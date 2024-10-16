import { Link } from "react-router-dom"

const Nav = ({ user, handleLogOut }) => {
  let userOptions

  if (user) {
    userOptions = (
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/about"> About </Link>
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </nav>
    )
  }
  const publicOptions = (
    <nav>
      <Link to="/"> Home </Link>
      <Link to="/about"> About </Link>
      <Link to="/register"> Register </Link>
      <Link to="/signin"> Sign in </Link>
    </nav>
  )

  return (
    <header>
      <div className="headlogo">
        <Link to="/">
          <img src="../public/RideRadarLogo.png" alt="RideRadarLogo" />
        </Link>
      </div>
      {user ? userOptions : publicOptions}
    </header>
  )
}
export default Nav
