import React, {useState, useRef,useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

import Header from '../components/Header';
import HomeCategoryScroll from '../components/HomeCategoryScroll';
import { RName } from '../components/Cards';
import restName from './TryData/restName';
import Footer from '../components/Footer';
import { restaurantRoute } from '../utils/APIroutes';
import { searchRoute } from '../utils/APIroutes';

function Home(){
    const searchUrl=searchRoute.concat("/getrestaurants");
    const [restaurants, setRestaurants] = React.useState([{}]);
    const [searchRestaurants, setSearchRestaurants] = React.useState([{}]);
    const [loading, setLoading] = React.useState(true);
    const[isSearchPage, setSearchPage] = useState(false);

    const getSearchItems = async(results) => {
        const { data } = await axios.post(searchUrl,{
            restaurants : results,
        })
        setSearchRestaurants(data);
        setSearchPage(true);
    }

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
        {(loading)?
            <div>Loading...</div>
        :
        <div style={{
            position:"relative",
            minHeight:"100vh",
        }}>
        <section>
            <Header getSearchItems={getSearchItems}/>
        </section>
        
            {isSearchPage?
            <>
            <div className='contentm'>
            
                <div className='hdiv2'>
                    <h2>Food delivery in IIT Bhilai</h2>
                    <div className='hres_container'>
                        <div class="row">
                            {searchRestaurants.map(create_restName)}
                        </div> 
                        {/* {console.log("searchRestaurants")} */}
                    </div>               
                </div>
                </div>
            </>
            :
            <>  
            <div className='contentm'>
                <HomeCategoryScroll getSearchItems={getSearchItems}/>       
                <div className='hdiv2'>
                    <h2>Food delivery in IIT Bhilai</h2>
                    <div className='hres_container'>
                        <div class="row">
                            {restaurants.map(create_restName)}
                        </div> 
                    </div>               
                </div>
            </div>
            </>
            }
            
        
        {/* <section>
            <Footer/> 
        </section> */}
        </div>
        }
        </>
        
    )
}
export default Home;