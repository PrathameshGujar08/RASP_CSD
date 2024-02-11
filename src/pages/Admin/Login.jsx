import React, {useState ,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute } from '../../utils/APIroutes';
 

function AdminLogin() {
  const store_name = "CAMPDEL";

  const toastconf = {
    position :  toast.POSITION.TOP_RIGHT,
    autoClose : 8000,
    draggable : true,
    pauseOnHover : true,
    theme : 'light',
    
  };

  const navigate = useNavigate();

  // Admin infomation values
  const [values, setValues] = useState({ 
    email : "",
    password : "",
  })


  useEffect(() => {
    if(localStorage.getItem("current-food-delivery-user")){
      navigate("/");
    }
  }, [])

  // Storing values for admin
  const handleChange = (event) => {
    setValues({...values, [event.target.name] : event.target.value})
  }

const handleSubmit = async(event) => {
    event.preventDefault();
  
    const {email, password} = values;
    try{
        const response = await axios.post( loginRoute , {
        "email":email,
        "password":password,
        "role":"admin"
        })
        localStorage.removeItem('food-delivery-phone')
        localStorage.setItem('food-delivery-email', JSON.stringify(response.data.ID));
        localStorage.setItem('food-delivery-token', JSON.stringify(response.data.token));
        toast.success("Login Succesful", toastconf);
        setTimeout(() => {
        navigate("/admin")
        }, 2000);
    } catch (error){
        toast.error("User or Password does not match", toastconf);
    }
}

  return (
    <div className="sigin">
      <div
        className={"container"}
        id="container"
      >      

      {/* Admin form */}

      <div className="form-container sign-in-container">
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            {/* <img src={Logo} alt="logo" /> */}
            <h1>{store_name}</h1>
          </div>
          <input 
          type="email" 
          placeholder="Institute Email" 
          name="email"
          pattern= "[a-z0-9]+@iitbhilai.ac.in"
          title = "Email id should be from IIT Bhilai" required
          onChange={(e) => handleChange(e)}
          />
          <input 
          type="password" 
          placeholder="Password" 
          name="password" required
          onChange={(e) => handleChange(e)}
          />
          <div className="button-div">
            <button type='submit'>Login</button>
          </div>
          {console.log(values)}
        </form>
        <ToastContainer/>

      </div>
      

      <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-right">
              <img className = "imglogo" src={process.env.PUBLIC_URL + '/images/IIT Bhilai - White Logo.png' } alt ="logo" />
              <h1>Hello Admin!</h1>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminLogin;
