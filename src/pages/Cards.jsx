import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

// Restaurant name card on the home page
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

// food item card on the page of each restaurant
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

function CartItem(){
    return (
        <div style={{ display: 'flex', alignItems: 'center' , marginTop: '1.5rem'}}>
            <div style={{ width: '60%'}}>
                country delight
            </div>
            <div style={{ width: '20%'}}>
                <input style={{width:"95%"}} type="number" placeholder="1"  name="quantity"/>
            </div>
            <div style={{ width: '20%', textAlign: 'center'}}>
                &#8377; 120
            </div>
        </div>
    )
}

export {RName, RFoodItem, CartItem};