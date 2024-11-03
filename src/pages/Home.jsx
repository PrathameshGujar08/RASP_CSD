import React, {useState, useRef,useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

import Header from '../components/Header';
import HomeCategoryScroll from '../components/HomeCategoryScroll';
import { RName , SearchRest} from '../components/Cards';
import Footer from '../components/Footer';
import { restaurantRoute } from '../utils/APIroutes';

import ChatbotComponent from "../components/Chatbot/chatbot";

function Home(){
    const [restaurants, setRestaurants] = React.useState([{}]);
    const [loading, setLoading] = React.useState(true);
   
    function create_restName(items){
        return(
            <RName id={items.id} image={items.img} name={items.shopname}  key={items.id} />
        );
    };

    const allItems = async () => {
        try {
            const res = await axios.get(restaurantRoute, {crossDomain: true});
            const items = res.data;
            setRestaurants(items);
            setRestaurants((state) => {
                return state;
            });
            setLoading(false);
            if (!res.status === 200) {
                throw new Error(res.error);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        allItems();
    }, []);
    
    return(
        <>
        <section>
            <Header />
        </section>
        {(loading)?
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <img src={process.env.PUBLIC_URL + '/images/loading.gif' } alt ="loading" />
            </div>
            
        :
        <div>
        <div className='contentm'>
                <HomeCategoryScroll />       
                <div className='hdiv2'>
                    <h2>Food delivery in IIT Bhilai</h2>
                    <div >
                        <div class="row">
                            {restaurants.map(create_restName)}
                        </div> 
                    </div>               
                </div>
            </div>            
        
        {/* <section>
            <Footer/> 
        </section> */}
        <ChatbotComponent />
        </div>
        }
        </>
        
    )
}
export default Home;