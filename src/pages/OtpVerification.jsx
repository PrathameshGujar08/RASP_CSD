import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { otpverficationRoute } from '../utils/APIroutes';
import { useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';

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
      <ToastContainer />
      <div className = "otp-block">
        <img src={process.env.PUBLIC_URL+'/images/email.svg'} alt="email" />

        <h2 style={{marginBottom:'2rem'}}>Verify Your Email</h2>
        <p><b>An OTP code has been sent to your email address. </b> <br/>
        Please check your inbox and enter the verification code below to verify your account</p>
        <form className='otp-form' onSubmit={(e) => handleSubmit(e)}>
          <input 
            className="otpInput"
            type="text" 
            name="otp"
            onChange={(e)=>handleChange(e)}
          />
          <Button className='otp-Submit' 
            type="submit"
            style={{ 
              width : '201.6px', 
              'background-color' :'#584b95', 
              marginTop:'1rem',
              color : 'white'}}>
            Verify
          </Button>
        </form>
      
      </div>
    </div>
    
  );
}