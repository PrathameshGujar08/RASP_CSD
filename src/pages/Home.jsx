import React, {useState, useRef,useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

import Header from '../components/Header';
import HomeCategoryScroll from '../components/HomeCategoryScroll';
import { RName } from '../components/Cards';
import restName from './TryData/restName';
import Footer from '../components/Footer';
import { restaurantRoute } from '../utils/APIroutes';

function Home(){
    const sliderRef = useRef(null);
    const scrollAmount = 100;
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
            console.log("wohooo!!! " + res.data)
            setRestaurants(items);
            setRestaurants((state) => {
                console.log("done!!!!");
                console.log(restaurants);
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
    if (loading) {
        return <div>Loading...</div>;
    }
    return(
        <div>
        <section>
            <Header/>
        </section>
        <div className='contentm'>
            <HomeCategoryScroll/>      
            <div className='hdiv2'>
                <h2>Food delivery in IIT Bhilai</h2>
                <div className='hres_container'>
                    <div class="row">
                        {restaurants.map(create_restName)}
                    </div> 
                </div>               
            </div>
            
        </div>
        
        {/* <section>
            <Footer/> 
        </section> */}
        </div>
        
    )
}
export default Home;