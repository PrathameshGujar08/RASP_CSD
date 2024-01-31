// imports
import React, {useState ,useEffect} from 'react'
import { Link , useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { registerRoute } from '../utils/APIroutes';

import {Icon} from 'react-icons-kit';
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'
function Register() {

  const navigate = useNavigate();
  const store_name = "CAMPDEL";
  const toastconf = {
    position :  toast.POSITION.TOP_RIGHT,
    autoClose : 8000,
    draggable : true,
    pauseOnHover : true,
    theme : 'light',
  };

  const [c_values, c_setValues] = useState({
    username : "",
    email : "",
    password : "",
    confirmpassword : "",
  })

  const [v_values, v_setValues] = useState({
    username : "",
    phonenumber: 0,
    password : "",
    confirmpassword : "",
  })

  const [swapPanel, setSwapPanel] = useState(false);
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff)

  useEffect(() => {
    if(localStorage.getItem("current-food-delivery-user")){
      navigate("/");
    }
  }, [])

  // Form Switching
  const signUpButton = () => {
    setSwapPanel(true);
  };

  const signInButton = () => {
    setSwapPanel(false);
  };

  // Settig variables for customer 
const c_handleChange = (event) => {
  c_setValues({...c_values, [event.target.name] : event.target.value})
}

// Setting variables for vendor
const v_handleChange = (event) => {
  v_setValues({...v_values, [event.target.name] : event.target.value})
}

// Handling submit and syntax checking for input values.
const c_handleSubmit = async(event) => {
// Prevent auto refresh
  event.preventDefault();

  const {username, email, password, confirmpassword} = c_values;
    if(password !== confirmpassword){
      toast.error("Your Password and confirm Password do not match.", toastconf);
      // alert("Your Password and confirm Password do not match.")
    }
    else{
      try{
        const data = {
          "name":username,
          "email":email,
          "password":password,
          "role":"user"
        }
      const response = await axios.post(registerRoute, data)
    
        toast.success("Sending OTP...A", toastconf)
        sessionStorage.setItem("food-delivery-email", JSON.stringify(
          { 
           email
          }
        ))
        setTimeout(() => {
          navigate("/verifyotp")
        }, 1000);
        
    } catch(error){
      toast.error(error, toastconf)
    }
      } 
  }     

const v_handleSubmit = async(event) => {
// Prevent auto refresh
  event.preventDefault();

  const {username, phonenumber,shopname, password,confirmpassword} = v_values;

  if(password !== confirmpassword){
      toast.error("Your Password and confirm Password do not match.", toastconf);
      alert("Your Password and confirm Password do not match.")
    }
    else{
      try{
      const response = await axios.post(registerRoute, {
        "shopname":shopname,
        "name":username,
        "phone":phonenumber,
        "password":password,
        "role":"vendor"
      })
      toast.success("Registration succesful!", toastconf)    
      setTimeout(() => {
        navigate("/login")
      }, 2000);
    } catch(error){
      toast.error(error, toastconf)
    }

    }     
}

  const handleToggle = () => {
    if (type==='password'){
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeOff)
      setType('password')
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
            <h1>{store_name}</h1>
          </div>
          <input 
          type="text" 
          placeholder="Full Name" 
          name="username" required
          onChange={(e) => v_handleChange(e)}
          />
          <input 
          type="tel" 
          placeholder="Phone Number" 
          name="phonenumber"
          pattern="[6-9]\d{9}"  required
          title='Enter valid phone number'
          onChange={(e) => v_handleChange(e)}
          />
          <input 
          type="text" 
          placeholder="Shop Name" 
          name="shopname"  required
          onChange={(e) => v_handleChange(e)}
          />

          <div >
            <input 
            type={type} 
            style={{width:'15.5rem'}}
            placeholder="Password" 
            name="password"  required
            onChange={(e) => v_handleChange(e)}
            />
            <span class="flex justify-around items-center" onClick={handleToggle}>
                <Icon class="absolute mr-10" icon={icon} size={20}/>
            </span>
          </div>

          <input 
          type="password" 
          placeholder="Confirm Password" 
          name="confirmpassword"  required
          onChange={(e) => v_handleChange(e)}
          />
          <div className="button-div">
            <button type='submit'>Create Account</button>
            <span>
            Already have an account? <Link to="/login">Login</Link>
            </span>
          </div>
         
        </form>

        <ToastContainer />
      </div>

{/* Student form */}

      <div className="form-container sign-in-container">
        <form onSubmit={(event) => c_handleSubmit(event)}>
          <div className="brand">
            {/* <img src={Logo} alt="logo" /> */}
            <h1>{store_name}</h1>
          </div>
          <input 
          type="text" 
          placeholder="Full Name" 
          name="username"  required
          onChange={(e) => c_handleChange(e)}
          />
          <input 
          type="text" 
          placeholder="Institute Email" 
          name="email"
          pattern= "[a-z0-9]+@iitbhilai.ac.in"
          title='Use Institute Email-ID' 
          required
          onChange={(e) => c_handleChange(e)}
          />
          <input 
          type="password" 
          placeholder="Password" 
          name="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
          title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required
          onChange={(e) => c_handleChange(e)}
          />
          <input 
          type="password" 
          placeholder="Confirm Password" 
          name="confirmpassword"  required
          onChange={(e) => c_handleChange(e)}
          />
          <div className="button-div">
            <button type='submit'>Create Account</button>
            <span> Already have an account? <Link to="/login">Login</Link> </span>
          </div>
          
        </form>
        <ToastContainer />
      </div>

      <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
            <img className = "imglogo" src={process.env.PUBLIC_URL + '/images/IIT Bhilai - White Logo.png' } alt ="logo" />
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
              <img className = "imglogo" src={process.env.PUBLIC_URL + '/images/IIT Bhilai - White Logo.png' } alt ="logo" />
              <h1>Hello Customer!</h1>
              <p>
                If you are a customer, register with your Institute credentials.
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