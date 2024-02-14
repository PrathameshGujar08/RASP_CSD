import React, {useState, useRef } from 'react'
import { Link , useNavigate} from 'react-router-dom';
import homeCategory from '../pages/TryData/HomeCategory';

function HomeCategoryScroll({ getSearchItems }){
    const navigate = useNavigate();
    const sliderRef = useRef(null);
    const scrollAmount = 200;

    const searchFunction = async (sQuery) => {
        navigate(`/search/${sQuery}`);
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
                    {homeCategory.map((items)=>{
                        return (
                            <div style={{ textAlign: 'center' }}
                                onClick={(e)=>{
                                searchFunction(items.name);
                            }} 
                            > 
                                <img className="home-menu-image" alt="..." src={items.img} />
                                <h5 style={{ marginTop: '5px' }} >{items.name}</h5>
                            </div>
                        )
                    })}
                    
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