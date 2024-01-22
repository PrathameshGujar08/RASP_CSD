import React, {useState} from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import OrderDetails from "./OrderDetails";

// Restaurant name card on the home page
function RName(props) {
    return (
        <div class="col-lg-3 hmcard">
            <div class="hm_card">
            {<Link to={`/restuarant/${props.id}`}><img className="hmcard_img" src={process.env.PUBLIC_URL + props.image} alt="Avatar" /></Link>}
                <div class="hm_cardcontainer">
                    <h5><b>{props.name}</b></h5>
                    {/* description */}
                </div>
             </div>  
        </div>
    );
}

// food item card on the page of each restaurant
function RFoodItem(props){
    return(

        <div className="Rcontainer">
            <div className="Rcard">
                <div className="Rimage">
                    <img src={process.env.PUBLIC_URL + props.img} alt="Product" />
                </div>
                <div className="Rcontent">
                    <h3>{props.title}</h3>
                    <p>&#8377; {props.price}</p>
                    <p>{props.desc}</p>
                    <Button variant="outline-success" size="sm">Add</Button>
                </div>
            </div>      
        </div>
    )
}

// food items added in the cart page
function CartItem(props){
    return (
        <div style={{ display: 'flex', alignItems: 'center' , marginTop: '1.5rem'}}>
            <div style={{ width: '60%'}}>
                {props.name}
            </div>
            <div style={{ width: '20%'}}>
                <input style={{width:"95%"}} type="number" placeholder="1"  name="quantity"/>
            </div>
            <div style={{ width: '20%', textAlign: 'center'}}>
                &#8377; {props.price}
            </div>
        </div>
    )
}

// order history food itema
function OrderHistItem(props) {
    const [modal, setModal]=useState(false);
    return (
        <div class="col-lg-4 " >
            <div className="ordercard">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                        src={process.env.PUBLIC_URL + props.img} alt="Your Photo"
                        style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius:'0.5rem' }}
                    />
                    <h5>{props.restaurant}</h5>
                    <h6 style={{ marginLeft: 'auto' , marginBottom:'auto'}}>{props.status}</h6>
                </div>
                
                <hr/>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ lineHeight: '1' }}>
                        <div>
                            <strong>ORDER NUMBER</strong><br/>
                            {props.orderNo}
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <strong>TOTAL AMOUNT</strong><br/>
                            ₹ {props.total}
                        </div>

                        <div style={{ marginTop: '1rem' }}>
                            <strong>ITEMS</strong><br/>
                            {props.foodItems}
                        </div>

                        <div style={{ marginTop: '1rem', marginBottom: '4rem' }}>
                            <strong>ORDERED ON</strong><br/>
                            {props.time}
                        </div>
                    </div>
                    <Button 
                        style={{ marginTop: 'auto' , marginLeft: 'auto'}} variant="outline-danger" 
                        onClick={()=> setModal(!modal)}>
                        View Details
                    </Button>
                    { modal && <div className="profileModal">
                        <div className="profileOverlay">
                            <div className="profileModal-content">
                                <OrderDetails/>
                                <Button className="profileClosebtn" onClick={()=> setModal(!modal)}><i class="fa-solid fa-xmark"></i></Button>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export {RName, RFoodItem, CartItem, OrderHistItem};