import React, {useState ,useEffect} from 'react'
import { Link , useNavigate} from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify'; 
// import 'react-toastify/dist/ReactToastify.css';
// import { registerRoute } from '../utils/APIRoutes';
import axios from 'axios'
function Register() {

  const navigate = useNavigate();
  // const toastconf = {
  //   position :  toast.POSITION.TOP_RIGHT,
  //   autoClose : 8000,
  //   draggable : true,
  //   pauseOnHover : true,
  //   theme : 'light',
  // };

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

const c_handleChange = (event) => {
  c_setValues({...c_values, [event.target.name] : event.target.value})
}
const v_handleChange = (event) => {
  v_setValues({...v_values, [event.target.name] : event.target.value})
}

const c_handleSubmit = async(event) => {
  event.preventDefault();
  const {username, email, password,confirmpassword} = c_values;
    // console.log(values);
    if(password !== confirmpassword){
      // toast.error("Your Password and confirm Password do not match.", toastconf);
      alert("Your Password and confirm Password do not match.")
    }
    else{
      const response = await axios.post("http://localhost:8000/register", {
        "name":username,
        "email":email,
        "password":password,
        "role":"user"
      })
      if(response.status === false)
      {
        alert("error registering from server")
        // toast.error(data.msg, toastconf);
      }
      else
      {
        // localStorage.setItem('food-delivery-user', JSON.stringify(data.user));
        console.log("succesfully registered!");
        alert("success in registration !")

          navigate("/")
      } 
    }     
}
const v_handleSubmit = async(event) => {
  event.preventDefault();
  const {username, phonenumber,shopname, password,confirmpassword} = v_values;
    // console.log(values);
    if(password !== confirmpassword){
      // toast.error("Your Password and confirm Password do not match.", toastconf);
      alert("Your Password and confirm Password do not match.")

    }
    else{
      const response = await axios.post("http://localhost:8000/register", {
        "shopname":shopname,
        "name":username,
        "phone":phonenumber,
        "password":password,
        "role":"vendor"
      })
      if(response.status === false)
      {
        alert("error registering vendor from server")
        // toast.error(data.msg, toastconf);
      }
      else
      {
          // localStorage.setItem('food-delivery-vendor', JSON.stringify(data.user));
          alert("success in registration !")
          navigate("/")
      }  
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
          { <input 
          type="text" 
          placeholder="Shop Name" 
          name="shopname"  required
          onChange={(e) => v_handleChange(e)}
          /> }
          <input 
          type="password" 
          placeholder="Password" 
          name="password"  required
          onChange={(e) => v_handleChange(e)}
          />
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

        {/* <ToastContainer /> */}
      </div>
      {console.log(v_values)}

{/* Student form */}

      <div className="form-container sign-in-container">
        <form onSubmit={(event) => c_handleSubmit(event)}>
          <div className="brand">
            {/* <img src={Logo} alt="logo" /> */}
            <h1>IIT Bhilai Store</h1>
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
        {/* <ToastContainer /> */}
      </div>
      {console.log(c_values)}

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