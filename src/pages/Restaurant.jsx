import React, { useState } from 'react';

import Categories from './Categories';
import items from './TryData/data';
import Header from "./Header";
import { RFoodItem } from "./Cards";
const allCategories = ['all', ...new Set(items.map(item => item.category))];
function Restaurant() {
    const [menuItems, setMenuItems] = useState(items);
    const [categories, setCategories] = useState(allCategories);

    const filterItems = category => {
        console.log('click', category);
        if(category =='all'){
        setMenuItems(items);
        return;
        }
        const newItems = items.filter((item) => item.category === category);
        setMenuItems(newItems);
    };
    function create_menu(items){
        return(
            <RFoodItem id={items.id} title={items.title} img={items.img} desc={items.desc} price={items.price} key={items.id} />
        );
    };
    return (
        <div>
            <Header/>
            <h1 id="resHead">Tech Cafe</h1>
            <div className='hr_food'> <hr className="horizontalLine"/></div>
            
            <div className="RmainCont">
                <div className='catFoodCont'>
                    <div className='leftDiv'>
                        <Categories categories={categories} filterItems={filterItems} />
                        
                    </div>
                    <div className='rightDiv'>
                        {menuItems.map(create_menu)}
                    </div>
                </div>
            </div>
            
        </div>

    );
}

export default Restaurant;
