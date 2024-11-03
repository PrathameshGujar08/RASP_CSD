// new file called DogPicture.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';


const CartWidget = () => {
  const navigate = useNavigate();

  const cartFunction = async (e) => {
    navigate(`/cart`);
  }
  return (
    <div>
    
      <Button variant="outline-dark" 
      onClick={(e)=>{cartFunction(e)}}
      ><i className="fa-solid fa-cart-shopping"></i></Button>
    </div>
  );
};

export default CartWidget;