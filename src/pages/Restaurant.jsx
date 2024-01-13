import React, { useState } from 'react';
import Menu from './Menu';
import Categories from './Categories';
import items from './data';
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
                        <Menu items={menuItems} />
                    </div>
                </div>
            </div>
            
        </div>

    );
}

export default Restaurant;
