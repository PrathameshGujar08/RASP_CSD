import React, {useState ,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

function Login() {

  const navigate = useNavigate();
  // Customer infomation values
  const [c_values, c_setValues] = useState({ 
    email : "",
    password : "",
  
  })

  // Vendor information values
  const [v_values, v_setValues] = useState({
    phonenumber: 0,
    password : "",
  })

  const [swapPanel, setSwapPanel] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("current-food-delivery-user")){
      navigate("/");
    }
  }, [])

  const signUpButton = () => {
    setSwapPanel(true);
  };
  const signInButton = () => {
    setSwapPanel(false);
  };

  // Storing values for customer
  const c_handleChange = (event) => {
    c_setValues({...c_values, [event.target.name] : event.target.value})
  }
  // Storing values of vendor
  const v_handleChange = (event) => {
    v_setValues({...v_values, [event.target.name] : event.target.value})
  }

const c_handleSubmit = async(event) => {
  event.preventDefault();
  event.preventDefault();
  const {email, password} = c_values;
  // navigate("/");
  const response = await axios.post("http://localhost:8000/login", {
    "email":email,
    "password":password,
    "role":"user"
  })
 console.log(response)
  if(response.status === false)
  {
    console.log("error");
    // toast.error(data.msg, toastconf);
  }
  else
  {
    // console.log(data)
    localStorage.removeItem('food-delivery-phone')
    localStorage.setItem('food-delivery-email', JSON.stringify(response.data.ID));
    localStorage.setItem('food-delivery-token', JSON.stringify(response.data.token));
      
      navigate("/")
  } 
}
const v_handleSubmit = async(event) => {
  event.preventDefault();
  const {phonenumber, password} = v_values;
  // navigate("/");
  const response = await axios.post("http://localhost:8000/login", {
    "phone":phonenumber,
    "password":password,
    "role":"vendor"
  })
  console.log("here is the respone after loggin in vendor", response)
  if(response.status === false)
  {
    console.log("error");
    // toast.error(data.msg, toastconf);
  }
  else
  {
    localStorage.removeItem('food-delivery-email')
    localStorage.setItem('food-delivery-phone', JSON.stringify(response.data.ID));
    localStorage.setItem('food-delivery-token', JSON.stringify(response.data.token));
      
      navigate("/")
  } 
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
        <form onSubmit={(event) => v_handleSubmit(event)}>
          <div className="brand">
            <h1>IIT Bhilai Store</h1>
          </div>
          <input 
          type="tel" 
          placeholder="Phone Number" 
          name="phonenumber"
          pattern="[6-9]\d{9}"
          title='Enter valid phone number' 
          required
          onChange={(e) => v_handleChange(e)}
          />
          <input 
          type="password" 
          placeholder="Password" 
          name="password"
          required
          onChange={(e) => v_handleChange(e)}
          />
          <div className="button-div">
            <button type='submit'>Login</button>
            <span>
            New here? Create a account! <Link to="/register">Register</Link>
            </span>
          </div>
          {console.log(v_values)}
        </form>
      </div>
      

      {/* Student form */}

      <div className="form-container sign-in-container">
        <form onSubmit={(event) => c_handleSubmit(event)}>
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
          onChange={(e) => c_handleChange(e)}
          />
          <input 
          type="password" 
          placeholder="Password" 
          name="password" required
          onChange={(e) => c_handleChange(e)}
          />
          <div className="button-div">
            <button type='submit'>Login</button>
            <span>
            New here? Create a account! <Link to="/register">Register</Link>
            </span>
          </div>
          {console.log(c_values)}
        </form>
      </div>
      

      <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
            <img className = "imglogo" src={process.env.PUBLIC_URL + '/images/IIT Bhilai - White Logo.png' } alt ="logo" />
            <h1>Welcome Vendor!</h1>
              <p>Thanks for joining with us! login Here. If you are a customer, click below</p>
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
              <img className = "imglogo" src={process.env.PUBLIC_URL + '/images/IIT Bhilai - White Logo.png' } alt ="logo" />
              <h1>Hello Customer!</h1>
              <p>
                If you are a customer, Login with your Institute credentials.
                If you are a vendor, click below.
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

export default Login
