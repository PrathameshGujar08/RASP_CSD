import React, { useState ,useEffect} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";

import Header from "../components/Header";
import { SearchRest} from "../components/Cards";
import { searchRoute } from '../utils/APIroutes';


function Search() {
    const param = useParams();
    const restIds=searchRoute.concat("/getQuery");
    const searchUrl=searchRoute.concat("/getrestaurants");
    const sQuery = param.sQuery;
    const [searchRestaurants, setSearchRestaurants] = React.useState([{}]);
    const [loading, setLoading] = React.useState(true);
    const[isSearchPage, setSearchPage] = useState(false);
   
    // This gives information about all the restaurants with dosa (info about name,image etc.)
    const getSearchItems = async(results) => {
      
        const { data } = await axios.post(searchUrl,{
            restaurants : results,
        })
        setSearchRestaurants(data);
        setSearchPage(true);
    }

    // This will give the restaurants ids serving the food item sQuery
    const searchFunction = async (e) => {
        try{
            const { data } = await axios.post(restIds, 
                {
                    query : sQuery,
                }
            )
            if(data)
            {
                getSearchItems(data);
            }
            else{
                console.log("error")
            }

        } catch (err)
        {
            toast.error("Error", err);
        }
    }
    function create_searchRest(items){
        return(
            <SearchRest id={items.id} image={items.img} name={items.shopname} sQuery="HELLO" key={items.id} />
        );
    };
    useEffect(() => {
        searchFunction();
    }, [sQuery]);
    
    return (
        <div>
            <Header/>
            {isSearchPage?
            <>
            <div className='contentm'>
            
                <div className='hdiv2'>
                    <h2>Showing results for {sQuery}</h2>
                    <div>
                        <div class="row">
                            {searchRestaurants.map(create_searchRest)}
                        </div> 
                        {/* {console.log("searchRestaurants")} */}
                    </div>               
                </div>
                </div>
            </>
            :
            <>  
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
                <img src={process.env.PUBLIC_URL + '/images/loading.gif' } alt ="loading" />
            </div>
            </>
            }
            
        </div>

    );
}

export default Search;
