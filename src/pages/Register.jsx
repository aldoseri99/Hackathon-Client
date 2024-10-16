import { useNavigate } from "react-router-dom"
import { RegisterUser } from "../services/Auth"
import { useState } from "react"

const Register = () => {
  let navigate = useNavigate()
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  }
  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
    console.log(formValues)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formValues)
    await RegisterUser({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
      phone: "",
    })
    setFormValues(initialState)
    navigate("/signin")
  }
  return (
    <div>
      <h1>Register</h1>
      <form className="col" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <label htmlFor="name">Name</label>
          <input
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="John Smith"
            value={formValues.name}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="example@example.com"
            value={formValues.email}
            required
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="password"
            value={formValues.password}
            required
          />
        </div>
        <div className="input-wrapper">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            onChange={handleChange}
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            required
          />
        </div>
        <button
          disabled={
            !formValues.email ||
            (!formValues.password &&
              formValues.confirmPassword === formValues.password)
          }
        >
          Create Account
        </button>
      </form>
    </div>
  )
}

export default Register
