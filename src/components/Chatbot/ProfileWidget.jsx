import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';


const ProfileWidget = () => {
  const navigate = useNavigate();

  const cartFunction = async (e) => {
    navigate(`/profile_endpoint`);
  }
  return (
    <div>
    
      <Button variant="outline-dark" 
      onClick={(e)=>{cartFunction(e)}}
      ><i className="fa-solid fa-person"></i></Button>
    </div>
  );
};

export default ProfileWidget;