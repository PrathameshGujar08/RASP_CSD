import React, {useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import HomeCategoryScroll from './HomeCategoryScroll';
import { RName } from '../components/Cards';
import Footer from '../components/Footer';
function Home(){
    const sliderRef = useRef(null);
    const scrollAmount = 100;
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
                    <div className="row">
                        <RName/>
                        <RName/>
                        <RName/>
                        <RName/>
                        <RName/>
                        <RName/>
                        <RName/>
                    </div> 
                </div>               
            </div>
            
        </div>
        
        <section>
            <Footer/> 
        </section>
        </div>
        
    )
}
export default Home;