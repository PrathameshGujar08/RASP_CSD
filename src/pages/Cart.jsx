import React , {useContext,useEffect,useState} from "react";
import {useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import io from "socket.io-client";

import Header from "../components/Header";
import { CartItem } from "../components/Cards";
import { CartContext } from "../context/cart";
import cartData from './TryData/cartData';
import { placeOrderRoute, vendorRoute,orderHost } from "../utils/APIroutes";


function Cart() {
    const navigate = useNavigate();
    const socket=io.connect(orderHost);

    const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)
    const [vloading, setVLoading] = React.useState(true);
    const[vendor,setVendor]=useState();
    const[token,setToken]=useState();
    const[order,setOrder]=useState({
        instruction : "",
        phone: 0,
        fullName: "",
        address: ""
    });
    const handleChange = (event) => {
        setOrder({...order, [event.target.name] : event.target.value})
    }

    // handle submit order after clicking on proceed to pay
    const handleOrder =async(event)=>{

        // check if the required fields are entered correctly or not
        const phonePattern = /[6-9]\d{9}/;
        if (order.fullName.trim() === "" || order.address.trim() === "" || !phonePattern.test(order.phone)){
            toast.error("Please fill all the details correctly");
        }
        else{
            const itemList= cartItems.map((item) => {
                return {
                    orderid: item.title,
                    quantity: item.quantity,
                    price: item.price
                };
            });
            const newOrder= {
                token: token,
                items : itemList,
                instruction : order.instruction,
                paymentMode : "COD",
                restID: vendor.id,
                phone: order.phone,
                fullName: order.fullName,
                address: order.address
            }  
            try{
                const response = await axios.post(placeOrderRoute, newOrder);                
                toast.success("Your order is sent to the restaurant");
            } catch(error){
                toast.error("Could not place order.")
            }
        }

    }

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
            setToken(token);
            const custID= token.id;
            socket.emit("addUser",{"role":"user", "id": custID});
        }
        else {navigate("/login");}

        if(cartItems.length>0){
            vendorInfo();
        }
        else{ setVLoading(false); }
        
    }, []);

    useEffect(()=>{
        socket.on("receive_status",(data)=>{
            if(data.status ==="denied"){
                toast.error(`Your order has been ${data.status}`)    
            }
            else {toast.success(`Your order has been ${data.status}`)}
        });
    },[socket]);


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
                            <input className="cartInput" type="text"  placeholder="Fullname" name="fullName" onChange={(e) => handleChange(e)}/> 
                            <input className="cartInput" type="text"  placeholder="Mobile No." name="phone" onChange={(e) => handleChange(e)}/> 
                            <input className="cartInput" type="text"  placeholder="Delivery Address" name="address" onChange={(e) => handleChange(e)}/> 
                            <Button style={{width:'100%', marginTop:'2rem'}} variant="success" onClick={(e)=>{handleOrder(e)}}>PROCEED TO PAY</Button>
                            
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
                            {cartItems.map(create_cart)}
                            
                            {/* suggestion box */}
                            <input className="cartInput"
                                type="text" 
                                placeholder="Any suggestions?" 
                                name="instruction"
                                onChange={(e) => handleChange(e)}
                            />     
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
                        <ToastContainer/>
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