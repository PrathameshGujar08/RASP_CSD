import React, {useState, useRef } from 'react'
import { Link } from 'react-router-dom';
//<img className="menu-img-home" alt="..." src={process.env.PUBLIC_URL + '/images/pizza.jpg'} />

function HomeCategoryScroll(){
    const sliderRef = useRef(null);
    const scrollAmount = 200;
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
                    <div style={{ textAlign: 'center' }}> 
                        <img className="home-menu-image" alt="..." src={process.env.PUBLIC_URL + '/images/pizza.jpg'} />
                        <h5 style={{ marginTop: '5px' }} >Pizza</h5>
                    </div>
                    <div style={{ textAlign: 'center' }}> 
                        <img className="home-menu-image" alt="..." src={process.env.PUBLIC_URL + '/images/pizza.jpg'} />
                        <h5 style={{ marginTop: '5px' }} >Pizza</h5>
                    </div>
                    <div style={{ textAlign: 'center' }}> 
                        <img className="home-menu-image" alt="..." src={process.env.PUBLIC_URL + '/images/pizza.jpg'} />
                        <h5 style={{ marginTop: '5px' }} >Pizza</h5>
                    </div>
                    <div style={{ textAlign: 'center' }}> 
                        <img className="home-menu-image" alt="..." src={process.env.PUBLIC_URL + '/images/pizza.jpg'} />
                        <h5 style={{ marginTop: '5px' }}> Pizza</h5>
                    </div>
                    <div style={{ textAlign: 'center' }}> 
                        <img className="home-menu-image" alt="..." src={process.env.PUBLIC_URL + '/images/pizza.jpg'} />
                        <h5 style={{ marginTop: '5px' }} >Pizza</h5>
                    </div>
                    <div style={{ textAlign: 'center' }}> 
                        <img className="home-menu-image" alt="..." src={process.env.PUBLIC_URL + '/images/pizza.jpg'} />
                        <h5 style={{ marginTop: '5px' }} >Pizza</h5>
                    </div>
                    <div style={{ textAlign: 'center' }}> 
                        <img className="home-menu-image" alt="..." src={process.env.PUBLIC_URL + '/images/pizza.jpg'} />
                        <h5 style={{ marginTop: '5px' }} >Pizza</h5>
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