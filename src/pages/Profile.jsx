import React from "react";
import Button from 'react-bootstrap/Button';

import Header from "./Header";
import { OrderHistItem } from "./Cards";
import orderHistData from "./TryData/orderHistData";
// user profile page
function Profile() {
    function create_orderHist(items){
        return(
            <OrderHistItem id={items.id} img={items.img} restaurant={items.restaurant} status={items.status} orderNo={items.orderNo} total={items.total} foodItems={items.foodItems} time={items.time} key={items.id} />
        );
    };
    return (
        <div >
            <Header/>

            {/* the div with the user name and email */}
            <div className="profileMain">
                <div className="profile_topdiv">
                    <div style={{marginLeft:'7rem'}}>
                        <h4 style={{margin: '0'}}>Riyanshi Goyal</h4>
                        <p > riyanshigoyal@iitbhilai.ac.in</p>
                    </div>
                    <Button 
                        style={{marginLeft:'12rem', marginBottom:'1rem', backgroundColor: '#584b95', border:'none'}} >
                        Edit profile
                    </Button>
                </div>
            </div>

            {/* rest of the profile ie. order history part */}
            <div className="profileMain">
                <div className="profile_bottomdiv">
                    <h3>Order History</h3>
                    <div class="row">
                        {orderHistData.map(create_orderHist)}

                    </div> 
                </div>
                
            </div>
        </div>
    );
}


export {Profile};