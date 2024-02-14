import React, {useEffect,useState} from "react";
import {useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import axios from "axios";
import Header from "../components/Header";
import { OrderHistItem } from "../components/Cards";
import orderHistData from "./TryData/orderHistData";

import { orderHistoryRoute, vendorRoute} from "../utils/APIroutes";

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
            const res1 = await axios.get(url, {crossDomain: true});
            const items1 = res1.data;

            const rest = Array.from(new Set(items1.map(item => item.restID)));
            const url2=vendorRoute.concat("/getrestaurants")
            const res2  = await axios.post(url2,{restaurants : rest,})
            const items2 = res2.data;

            const items3 = items1.map(item1 => {
                const matchingItem2 = items2.find(item2 => item2._id === item1.restID);
                if (matchingItem2) {
                    return {
                        ...item1,
                        img: matchingItem2.img,
                        shopname: matchingItem2.shopname
                    };
                } else {
                    return { ...item1 }; // No matching item found in items2
                }
            });
            setOrders(items3);
            setOrders((state) => {
                return state;
            });
            setOrderLoading(false);
            if (!res1.status === 200) {
                throw new Error(res1.error);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    function create_orderHist(items){
        const time='Nov 12, 2023 at 20:03 PM'
        return(
            <OrderHistItem 
                id={items._id} img={items.img} restaurant={items.shopname} status={items.status} orderNo={items._id}  items={items.items} time={time} 
                phone={items.phone} address={items.address} paymentMode={items.paymentMode} key={items._id} />
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
    return (
        <>
        <Header/>
        {(loading || orderLoading)?
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <img src={process.env.PUBLIC_URL + '/images/loading.gif' } alt ="loading" />
            </div>
        :
        <div >
            {/* the div with the user name and email */}
            <div className="profileMain">
                <div className="profile_topdiv">
                    <div style={{marginLeft:'7rem'}}>
                        {/* <h4 style={{margin: '0'}}>Riyanshi Goyal</h4> */}
                        <p > {token.userID}</p>
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
        }
        </>
    );
}


export {Profile};