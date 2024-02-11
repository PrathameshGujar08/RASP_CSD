import React, {useState,useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { CartContext } from "../context/cart";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode'

import OrderDetails from "./OrderDetails";

// Restaurant name card on the home page
function RName(props) {
    const navigate = useNavigate();
    
    return (
        <div class="col-lg-3 hmcard">
            <div class="hm_card" onClick={()=>{
                navigate(`/restaurant/${props.id}`)
            }}>
            <img className="hmcard_img" src={props.image} alt="Avatar" />
                <div class="hm_cardcontainer">
                    <h5><b>{props.name}</b></h5>
                </div>
            </div>
             </div>  
    );
}

// Search result Restaurant name card 
function SearchRest(props) {
    const navigate = useNavigate();
    return (
        <div class="col-lg-3 hmcard">
            <div class="hm_card" onClick={()=>{
                navigate(`/restaurant/${props.id}`)
            }}>
            <img className="hmcard_img" src={props.image} alt="Avatar" />
                <div class="hm_cardcontainer">
                    <h5><b>{props.name}</b></h5>
                    {/* <p>{props.sQuery}</p> */}
                    {/* description */}
                </div>
             </div>  
        </div>
    );
}

// food item card on the page of each restaurant
function RFoodItem(props){
    const { cartItems, addToCart ,clearCart} = useContext(CartContext);

    const availability = props.availability;

    const checkCart= ()=>{
        // check if the user is logged in as customer or not
        if(localStorage.getItem("food-delivery-token"))
        {
            const token = jwtDecode(JSON.parse(localStorage.getItem('food-delivery-token')));
            if(token.userRole == "user"){

                 // check if items from another restaurant are already in the cart
                const isInCart = cartItems.length > 0 && cartItems.some(item => item.resId !== props.resId);
                if (isInCart) {
                    const isConfirmed = window.confirm("Items from another restaurant are already in the cart. Do you want to delete them?");
                    if (isConfirmed) {
                        clearCart();
                        toast.success("Cart has been cleared.")
                    }
                } else {
                    addToCart(props);
                    toast.success(`${props.title} has been added to the cart`);
                } 
            }
            else{
                toast.error("Please login as a customer to add items to the cart");
            }
        }
        else{
            toast.error("Please login as a customer to add items to the cart");
        }
        
    }
    return(

        <div className="Rcontainer">
            <div className="Rcard">
                <div className="Rimage">

                {availability
                ?
                (<img src={props.img}  alt="Product" />)
                :
                (<img src={props.img} style={{
                        filter:"grayscale(100%)",
                    }} alt="Product" />)}
                </div>

                <div className="Rcontent">
                    <h3>{props.title}</h3>
                    <p>&#8377; {props.price}</p>
                    <p>{props.desc}</p>
                    {/* toast.success(`${props.title} has been added to the cart`); */}
                    {availability
                    ?
                    (<Button variant="outline-success" size="sm"
                            onClick={() => { checkCart();}}
                        >Add
                        </Button>)
                    :
                    (<Button variant="outline-secondary" size="sm"
                        style={{color : "grey"}}
                        >Add
                        </Button>)}
                </div>
            </div>   
            <ToastContainer/>   
        </div>
    )
}

// food items added in the cart page
function CartItem(props){
    const {addToCart, removeFromCart } = useContext(CartContext)
    return (
        <div style={{ display: 'flex', alignItems: 'center' , marginTop: '1.5rem'}}>
            <div style={{ width: '60%'}}>
                {props.name}
            </div>
            <div style={{ display:"flex", width: '20%', gap:"0.2rem", background:"white"}}>
                {/* <input style={{width:"95%"}} type="number" placeholder="1"  name="quantity"/> */}
                <Button variant="success" size="sm" 
                    onClick={()=>{addToCart(props)}}
                >+
                </Button>
                <p>{props.quantity}</p>
                <Button size="sm" variant="success"
                     onClick={()=>{removeFromCart(props)}}
                >-
                </Button>
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

export {RName, RFoodItem, CartItem, OrderHistItem, SearchRest};