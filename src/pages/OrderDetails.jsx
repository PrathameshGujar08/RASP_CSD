import React, {useState} from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

// Restaurant name card on the home page
function OrderDetails() {
    return (
        <div style={{marginTop:'1rem', marginBottom:'3rem'}}>
            <h2>Order Details</h2>

            {/* restaurant name and image */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img 
                    src={process.env.PUBLIC_URL + '/images/dosa.jpg'} alt="Your Photo"
                    style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius:'0.5rem' }}
                />
                <h5>NJC</h5>
            </div>
            <hr/>

            <p style={{color:'blue'}}>Delivered</p>

            {/* ordered items */}
            <h4>Your Order</h4>
            <div style={{marginBottom:'0.5rem'}}>
                <div className="order_divs">
                    <h6 style={{ margin: '0', padding: '0' }}>Veg Kurkure Momos [8 Pieces]</h6>
                    <h6 style={{ margin: '0', padding: '0', textAlign: 'right' }}>&#8377; 85</h6>
                </div>
                <p style={{ margin: '0', padding: '0' }}>1 X 85</p>
            </div>

            {/* total amount */}
            <div className="order_amount">
                <div className="order_divs" >
                    <p style={{ marginBottom: '0.3rem' }}>Item Total</p>
                    <p style={{ marginBottom: '0',textAlign: 'right' }}>&#8377; 110</p>
                </div>
                <div className="order_divs">
                    <p style={{ margin: '0', padding: '0' }}>Delivery</p>
                    <p style={{ margin: '0', padding: '0',textAlign: 'right' }}>&#8377; 5</p>
                </div>
                <hr style={{ margin: '0.5rem 0' }}/>
                <div className="order_divs" style={{fontWeight:'bold'}}>
                    <p >Grand Total</p>
                    <p style={{ textAlign: 'right' }}>&#8377; 115</p>
                </div>

            </div>

            {/* order details */}
            <h4>Order Details</h4>
            <div style={{ marginTop:'1.5rem', lineHeight: '1.3'  }}>
                <div>
                    <strong style={{color: '#616569'}}>ORDER NUMBER</strong><br/>props.orderNo
                </div>

                <div style={{ marginTop: '1.3rem' }}>
                    <strong style={{color: '#616569'}}>PAYMENT</strong><br/>COD
                </div>
                <div style={{ marginTop: '1.3rem' }}>
                    <strong style={{color: '#616569'}}>DATE</strong><br/>props.time
                </div>
                <div style={{ marginTop: '1.3rem' }}>
                    <strong style={{color: '#616569'}}>PHONE NUMBER</strong><br/>props.phone
                </div>
                <div style={{ marginTop: '1.3rem',marginBottom:'3rem' }}>
                    <strong style={{color: '#616569'}}>DELIVER TO</strong><br/>props.address
                </div>            
            </div>

            

                                
        </div>
    );
}


export default OrderDetails;