import React , {useContext,useEffect,useState} from "react";
import {useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import Button from 'react-bootstrap/Button';
import axios from "axios";

import Header from "../components/Header";
import { CartItem } from "../components/Cards";
import { CartContext } from "../context/cart";
import cartData from './TryData/cartData';
import { vendorRoute } from "../utils/APIroutes";


function Cart() {
    const navigate = useNavigate();
    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)
    const [vloading, setVLoading] = React.useState(true);
    const[vendor,setVendor]=useState();

    const vendorInfo = async () => {
            try {
                const vendorInfoUrl=vendorRoute.concat("/").concat(cartItems[0].resId);
                const res = await axios.get(vendorInfoUrl, {crossDomain: true});
                const items = res.data;
                setVendor(items[0]);
                setVLoading(false);
                if (!res.status === 200) {
                    throw new Error(res.error);
                }
            }
            catch (err) {
                console.log(err);
            }
        
        
    }
    function create_cart(items){
        return(
            <CartItem id={items.id} name={items.title} price={items.price} quantity={items.quantity} key={items.id} />
        );
    };
    useEffect(() => {
        if(localStorage.getItem("food-delivery-token"))
        {
            const token = jwtDecode(JSON.parse(localStorage.getItem('food-delivery-token')));
            if(token.userRole != "user"){
                navigate("/login");
            }
        }
        else {navigate("/login");}

        if(cartItems.length>0){
            vendorInfo();
        }
        else{ setVLoading(false); }
        
    }, []);
    if(vloading){ return( <div>Loading</div> ) }
    return (
        <div >
            <Header/>
            <div className="cartMain">
                <div className='cartCont'>
                    {cartItems.length >0 ? 
                    <> 
                        {/* delivery details div */}
                        <div className='cartLeft'>
                            <h4>Delivery Details</h4>
                            <input className="cartInput" type="text"  placeholder="Fullname" name="suggestions"/> 
                            <input className="cartInput" type="text"  placeholder="Mobile No." name="suggestions"/> 
                            <input className="cartInput" type="text"  placeholder="Delivery Address" name="suggestions"/> 
                            <Button style={{width:'100%', marginTop:'2rem'}} variant="success" >PROCEED TO PAY</Button>
                            
                        </div>

                        {/* food cart and billing div */}
                        <div className='cartRight'>

                            {/* restaurant name and photo */}
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img
                                    src={vendor.img}
                                    alt="Your Photo"
                                    style={{ width: '50px', height: '50px', marginRight: '10px' }}
                                />
                                <h5>{vendor.shopname}</h5>
                            </div>

                            {/* food items */}
                            {/* {console.log("Cart is here")};
                            {console.log(cartItems)} */}
                            {cartItems.map(create_cart)}
                            
                            {/* suggestion box */}
                            <input className="cartInput"
                                type="text" 
                                placeholder="Any suggestions?" 
                                name="suggestions"/> 
                            <hr/>

                            {/* bill details */}
                            <h6>Bill Details</h6>
                            <div style={{ display: 'flex',  marginTop: '0.5rem'}}>
                                <div>Items Total</div>
                                <div style={{ marginLeft: 'auto ', marginRight:'0'}}> &#8377; {getCartTotal()} </div>
                            </div>

                            <div style={{ display: 'flex'}}>
                                <div>Delivery Fee</div>
                                <div style={{ marginLeft: 'auto ', marginRight:'0'}}> &#8377; 0 </div>
                            </div>
                            <hr style={{ height: '1px', background: 'black'}}/>

                            <div style={{ display: 'flex', fontWeight: 'bold'}}>
                                <div>To Pay</div>
                                <div style={{ marginLeft: 'auto ', marginRight:'0'}}> &#8377; {getCartTotal()} </div>
                            </div>
                        </div>
                    </> 
                    : 
                    <>
                        <div>cart is empty</div>
                    </>
                    }
                    
                </div>
            </div>
        </div>
    );
}



export default Cart;