import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { otpverficationRoute } from '../utils/APIroutes';
import { useNavigate} from 'react-router-dom';

export default function OtpVerification() {
  const navigate = useNavigate();
  const toastconf = {
    position :  toast.POSITION.TOP_RIGHT,
    autoClose : 8000,
    draggable : true,
    pauseOnHover : true,
    theme : 'light',
  };

  const [otp, setOtp] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = await sessionStorage.getItem("food-delivery-email");
    // Parsing string as JSON.
    const email = JSON.parse(userData);
    try {const response = await axios.post(otpverficationRoute, 
      {
        "email" : email.email,
        "otp": otp,
      })
      if(response.status === 201){
        toast.success("Registration succesful!", toastconf)
        navigate("/login")
      }
      else{
        console.log("nahi hua kuch")
      }
    } catch(error)
    {
      console.log(error);
    }
  }

  const handleChange = (event) => {
    setOtp(event.target.value)
  }

  return (
    <div className="otp-container">
    <h1><b>EMAIL AUTHENTICATION</b></h1>

    <div className = "otp-block">
    <img src={process.env.PUBLIC_URL+'/images/email.svg'} alt="email" />

    <h2>Verify Your Email</h2>
    <form className='otp-form' onSubmit={(e) => handleSubmit(e)}>
      <input 
      type="text" 
      name="otp"
      onChange={(e)=>handleChange(e)}
      />
      <button className='otp-Submit' 
      type="submit"
      style={{ 
      width : '201.6px', 
      'background-color' :'#584b95', 
      color : 'white'}}>
      Submit
      </button>
    </form>
    <p>Input OTP recieved on your email to verify your account!</p>
    </div>
    <ToastContainer />
    </div>
    
  );
}