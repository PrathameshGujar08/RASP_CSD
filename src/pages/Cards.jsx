import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

function RName() {
    return (
        <div class="col-lg-3 hmcard">
            <div class="hm_card">
                <img className="hmcard_img" src={process.env.PUBLIC_URL + '/images/pizza.jpg'} alt="Avatar" />
                <div class="hm_cardcontainer">
                    <h5><b>Tech Cafe</b></h5>
                    {/* description */}
                </div>
             </div>  
        </div>
    );
}

function RFoodItem(){
    return(

        <div className="Rcontainer">
            <div className="Rcard">
                <div className="Rimage">
                    <img src={process.env.PUBLIC_URL + '/images/pizza.jpg'} alt="Product" />
                </div>
                <div className="Rcontent">
                    <h3>title</h3>
                    <p>Price: price</p>
                    <p>description</p>
                    <Button variant="outline-success" size="sm">Add</Button>
                </div>
            </div>      
        </div>
    )
}

export {RName, RFoodItem};