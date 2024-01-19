import React from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import Header from "../components/Header";
import { CartItem } from "../components/Cards";
import cartData from './TryData/cartData';


function Cart() {
    function create_cart(items){
        return(
            <CartItem id={items.id} name={items.name} price={items.price} key={items.id} />
        );
    };
    return (
        <div >
            <Header/>
            <div className="cartMain">
                <div className='cartCont'>
                
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
                                src={process.env.PUBLIC_URL + '/images/pizza.jpg'}
                                alt="Your Photo"
                                style={{ width: '50px', height: '50px', marginRight: '10px' }}
                            />
                            <h5>Tech Cafe</h5>
                        </div>

                        {/* food items */}
                        
                        {cartData.map(create_cart)}
                        
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
                            <div style={{ marginLeft: 'auto ', marginRight:'0'}}> &#8377; 120 </div>
                        </div>

                        <div style={{ display: 'flex'}}>
                            <div>Delivery Fee</div>
                            <div style={{ marginLeft: 'auto ', marginRight:'0'}}> &#8377; 5 </div>
                        </div>
                        <hr style={{ height: '1px', background: 'black'}}/>

                        <div style={{ display: 'flex', fontWeight: 'bold'}}>
                            <div>To Pay</div>
                            <div style={{ marginLeft: 'auto ', marginRight:'0'}}> &#8377; 125 </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Cart;