import React, {useEffect,useState} from "react";
import {useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import axios from "axios";
import Header from "../components/Header";
import { OrderHistItem } from "../components/Cards";
import orderHistData from "./TryData/orderHistData";

import { orderHistoryRoute } from "../utils/APIroutes";

// user profile page
function Profile() {
    const navigate = useNavigate();
    const[token,setToken]=useState();
    const[loading,SetLoading]=useState(true);
    const[orderLoading, setOrderLoading]=useState(true);
    const[orders,setOrders]=useState([]);

    const fetchOrders= async()=>{
        try {
            const tokens = jwtDecode(JSON.parse(localStorage.getItem('food-delivery-token')));
            const url= orderHistoryRoute.concat("/").concat(tokens.id);
            const res = await axios.get(url, {crossDomain: true});
            const items = res.data;
            setOrders(items);
            setOrders((state) => {
                return state;
            });
            setOrderLoading(false);
            if (!res.status === 200) {
                throw new Error(res.error);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    function create_orderHist(items){
        const img=  '/images/pasta.jpg'
        const restaurant = 'tech cafe'
        const time='Nov 12, 2023 at 20:03 PM'
        return(
            <OrderHistItem id={items._id} img={img} restaurant={restaurant} status={items.status} orderNo={items._id}  items={items.items} time={time} key={items._id} />
        );
    };

    useEffect(() => {
        if(localStorage.getItem("food-delivery-token"))
        {
            const token = jwtDecode(JSON.parse(localStorage.getItem('food-delivery-token')));
            setToken(token)
            if(token.userRole != "user"){
                navigate("/login");
            }
            fetchOrders();
        }
        else {navigate("/login");}
        SetLoading(false);
    }, []);
    if(loading || orderLoading) return ( <div> Loading</div> )
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
                </div>
            </div>
            {/* rest of the profile ie. order history part */}
            <div className="profileMain">
                <div className="profile_bottomdiv">
                    <h3>Order History</h3>
                    {(orders)?
                    <>
                    <div class="row">
                        {orders.map(create_orderHist)}

                    </div> 
                    </>
                    :
                    <><div> You do not have any orders currently</div></>
                    }
                </div>
                
            </div>
        </div>
    );
}


export {Profile};