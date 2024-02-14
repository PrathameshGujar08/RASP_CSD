import React, {useState} from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

// Restaurant name card on the home page
function OrderDetails(props) {

    const itemTemplate = (item) => {
        return (
            // <div key={item.orderid}>
            //     <span>{item.quantity} X {item.orderid}</span>
            // </div>
            <div key={item.orderid} style={{marginBottom:'0.5rem'}}>
                <div className="order_divs">
                    <h6 style={{ margin: '0', padding: '0' }}>{item.orderid}</h6>
                    <h6 style={{ margin: '0', padding: '0', textAlign: 'right' }}>&#8377; {item.quantity*item.price}</h6>
                </div>
                <p style={{ margin: '0', padding: '0' }}>{item.quantity} X {item.price}</p>
            </div>
        );
        
    };

    const totalPriceTemplate = (items) => {
        const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        return <span>₹ {total}</span>;
    };
    return (
        <div style={{marginTop:'1rem', marginBottom:'3rem'}}>
            <h2>Order Details</h2>

            {/* restaurant name and image */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img 
                    src={props.img} alt="Your Photo"
                    style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius:'0.5rem' }}
                />
                <h5>{props.restaurant}</h5>
            </div>
            <hr/>

            <p style={{color:'blue'}}>{props.status}</p>

            {/* ordered items */}
            <h4>Your Order</h4>
            {props.items.map((item) => itemTemplate(item))}

            {/* total amount */}
            <div className="order_amount">
                <div className="order_divs" >
                    <p style={{ marginBottom: '0.3rem' }}>Item Total</p>
                    <p style={{ marginBottom: '0',textAlign: 'right' }}>{totalPriceTemplate(props.items)}</p>
                </div>
                <div className="order_divs">
                    <p style={{ margin: '0', padding: '0' }}>Delivery</p>
                    <p style={{ margin: '0', padding: '0',textAlign: 'right' }}>&#8377; 0</p>
                </div>
                <hr style={{ margin: '0.5rem 0' }}/>
                <div className="order_divs" style={{fontWeight:'bold'}}>
                    <p >Grand Total</p>
                    <p style={{ textAlign: 'right' }}>{totalPriceTemplate(props.items)}</p>
                </div>

            </div>

            {/* order details */}
            <h4>Order Details</h4>
            <div style={{ marginTop:'1.5rem', lineHeight: '1.3'  }}>
                <div>
                    <strong style={{color: '#616569'}}>ORDER NUMBER</strong><br/>{props.orderNo}
                </div>

                <div style={{ marginTop: '1.3rem' }}>
                    <strong style={{color: '#616569'}}>PAYMENT</strong><br/>{props.paymentMode}
                </div>
                {/* <div style={{ marginTop: '1.3rem' }}>
                    <strong style={{color: '#616569'}}>DATE</strong><br/>{props.time}
                </div> */}
                <div style={{ marginTop: '1.3rem' }}>
                    <strong style={{color: '#616569'}}>PHONE NUMBER</strong><br/>{props.phone}
                </div>
                <div style={{ marginTop: '1.3rem',marginBottom:'3rem' }}>
                    <strong style={{color: '#616569'}}>DELIVER TO</strong><br/>{props.address}
                </div>            
            </div>

            

                                
        </div>
    );
}


export default OrderDetails;