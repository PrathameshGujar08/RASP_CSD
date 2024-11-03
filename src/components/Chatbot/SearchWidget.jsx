// new file called DogPicture.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';


const SearchWidget = ({searchTerm}) => {
  console.log("here is the search term we want to navigate to : ", searchTerm)
  const navigate = useNavigate();

  const searchFunction = async (e) => {
    navigate(`/search/${searchTerm}`);
  }
 
  return (
    <div>
    
      <Button variant="outline-dark" 
      onClick={(e)=>{searchFunction(e)}}
      ><i className="fa-solid fa-magnifying-glass"></i></Button>
    </div>
  );
};

export default SearchWidget;