import React, {useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import { searchRoute } from '../utils/APIroutes';

function HomeCategoryScroll({ getSearchItems }){
    const searchUrl=searchRoute.concat("/getQuery");
    const sliderRef = useRef(null);
    const scrollAmount = 200;

    const searchFunction = async (sQuery) => {
        try{
            const { data } = await axios.post(searchUrl, 
                {
                    query : sQuery,
                }
            )
            if(data)
            {
                console.log("runs");
                console.log(data);
                getSearchItems(data);
            }
            else{
                console.log("error")
            }

        } catch (err)
        {
            // toast.error("Error", err);
            console.log(err);
        }
    }
    return(
        <div className='hmenu-div'>
            <div className='hdiv2'><h2>What do you want to eat today?</h2></div>
            <div className="home-menu">
                {/* Left navigation button */}
                <button 
                    className="home-menu-nav-btn"
                    onClick={() => {
                    const container = sliderRef.current;
                    container.scrollLeft -= scrollAmount; // Scroll left by the specified amount
                    }}
                >
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                {/* Image container */}
                <div className="home-menu-images-container" ref={sliderRef}>
                    <div style={{ textAlign: 'center' }}
                       onClick={(e)=>{
                        searchFunction("Pizza");
                       }} 
                    > 
                        <img className="home-menu-image" alt="..." src={process.env.PUBLIC_URL + '/images/pizza.jpg'} />
                        <h5 style={{ marginTop: '5px' }} >Pizza</h5>
                    </div>
                    <div style={{ textAlign: 'center' }}> 
                        <img className="home-menu-image" alt="..." src={process.env.PUBLIC_URL + '/images/maggi.jpg'} />
                        <h5 style={{ marginTop: '5px' }} >Maggi</h5>
                    </div>
                    <div style={{ textAlign: 'center' }}> 
                        <img className="home-menu-image" alt="..." src={process.env.PUBLIC_URL + '/images/pasta.jpg'} />
                        <h5 style={{ marginTop: '5px' }} >Pasta</h5>
                    </div>
                    <div style={{ textAlign: 'center' }}> 
                        <img className="home-menu-image" alt="..." src={process.env.PUBLIC_URL + '/images/shakes.jpg'} />
                        <h5 style={{ marginTop: '5px' }}> Shakes</h5>
                    </div>
                    <div style={{ textAlign: 'center' }}> 
                        <img className="home-menu-image" alt="..." src={process.env.PUBLIC_URL + '/images/chinese.jpg'} />
                        <h5 style={{ marginTop: '5px' }} >Chinese</h5>
                    </div>
                    <div style={{ textAlign: 'center' }}> 
                        <img className="home-menu-image" alt="..." src={process.env.PUBLIC_URL + '/images/dosa.jpg'} />
                        <h5 style={{ marginTop: '5px' }} >South Indian</h5>
                    </div>
                    <div style={{ textAlign: 'center' }}> 
                        <img className="home-menu-image" alt="..." src={process.env.PUBLIC_URL + '/images/juice.jpeg'} />
                        <h5 style={{ marginTop: '5px' }} >Juice</h5>
                    </div>
                    
                    
                    {/* {images.map((image) => {
                    return (
                        <img
                        className="image"
                        alt="sliderImage"
                        <img className="menu-img-home" alt="..." src={process.env.PUBLIC_URL + '/images/pizza.jpg'} />
                        />
                    );
                    })} */}
                </div>
                {/* Right navigation button */}
                <button
                    className="home-menu-nav-btn"
                    onClick={() => {
                    const container = sliderRef.current;
                    container.scrollLeft += scrollAmount; // Scroll right by the specified amount
                    }}
                >
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>            

        </div>
        
    )
}
export default HomeCategoryScroll;