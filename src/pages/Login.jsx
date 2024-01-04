import React, {useState } from 'react'
import { Link } from 'react-router-dom';

function Register() {
  const [swapPanel, setSwapPanel] = useState(false);

  const signUpButton = () => {
    setSwapPanel(true);
  };
  const signInButton = () => {
    setSwapPanel(false);
  };
const handleChange = () => {

}

const handleSubmit = () => {

}
  return (
    <div className="sigin">
      <div
        className={["container", swapPanel ? "right-panel-active" : null]
          .filter(Boolean)
          .join(" ")}
        id="container"
      >

      {/* Vendor Form */}

      <div className="form-container sign-up-container">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            {/* <img src={Logo} alt="logo" /> */}
            <h1>IIT Bhilai Store</h1>
          </div>
          <input 
          type="tel" 
          placeholder="Phone Number" 
          name="phonenumber"
          pattern="[6-9]\d{9}"
          title='Enter valid phone number'
          onChange={(e) => handleChange(e)}
          />
          <input 
          type="password" 
          placeholder="Password" 
          name="password"
          onChange={(e) => handleChange(e)}
          />
          <button type='submit'>Login</button>
          <span>
          New here? Create a account! <Link to="/register">Register</Link>
          </span>
        </form>
      </div>

{/* Student form */}

      <div className="form-container sign-in-container">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            {/* <img src={Logo} alt="logo" /> */}
            <h1>IIT Bhilai Store</h1>
          </div>
          <input 
          type="email" 
          placeholder="Institute Email" 
          name="email"
          pattern= "[a-z0-9]+@iitbhilai.ac.in"
          title = "inafer" required
          onChange={(e) => handleChange(e)}
          />
          <input 
          type="password" 
          placeholder="Password" 
          name="password"
          onChange={(e) => handleChange(e)}
          />
          <button type='submit'>Login</button>
          <span>
          New here? Create a account! <Link to="/register">Register</Link>
          </span>
        </form>
      </div>

      <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
            <h1>Welcome Vendor!</h1>
              <p>Thanks for joining with us! Register Here. If you are a customer, click below</p>
              <button
                type="button"
                onClick={signInButton}
                className="ghost"
                id="signIn"
              >
                I am a customer
              </button>
            </div>
            <div className="overlay-panel overlay-right">
            <h1>Hello Customer!</h1>
              <p>
                If you are a customer, Login with your Institute credentials.
                If you are a vendor, Register below.
              </p>
              <button
                type="button"
                onClick={signUpButton}
                className="ghost"
                id="signUp"
              >
                I am a Vendor
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Register