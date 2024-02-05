import React, { useState ,useEffect} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from "axios";


import Categories from '../components/Categories';
// import items from './TryData/data';
import Header from "../components/Header";
import { RFoodItem } from "../components/Cards";
import { itemRoute, vendorRoute } from '../utils/APIroutes';


function Restaurant() {
    const navigate = useNavigate();
    const param = useParams();
    const productId = param.resId;
    const url = itemRoute.concat("/").concat(productId);
    const vendorInfoUrl=vendorRoute.concat("/").concat(productId);

    const [productData, setProductData] = useState([{}]);
    const [vloading, setVLoading] = React.useState(true);
    const [iloading, setILoading] = React.useState(true);

    const [menuItems, setMenuItems] = useState([{}]);
    const [categories, setCategories] = useState([]);
    const[vendor,setVendor]=useState();

    const allItems = async () => {
        try {
            const res = await axios.get(url, {crossDomain: true});
            const items = res.data;
            setProductData(items);
            const allCategories = ['all', ...new Set(items.map(item => item.category))];
            setCategories(allCategories); 
            setMenuItems(items);
            setILoading(false);
            if (!res.status === 200) {
                throw new Error(res.error);
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const vendorInfo = async () => {
        try {
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
   

    const filterItems = category => {
        console.log('click', category);
        if(category =='all'){
        setMenuItems(productData);
        return;
        }
        const newItems = productData.filter((item) => item.category === category);
        setMenuItems(newItems);
    };
    function create_menu(items){
        return(
            <RFoodItem id={items.id} title={items.name} img={items.img} desc={items.description} price={items.price} resId={items.resId} key={items._id}  />
        );
    };
    useEffect(() => {
        vendorInfo();
        allItems();
    }, []);
    if (iloading || vloading) {
        return <div>Loading...</div>;
    }
    return (
        <div>
            <Header/>
            <h1 id="resHead">{vendor.shopname}</h1>
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
