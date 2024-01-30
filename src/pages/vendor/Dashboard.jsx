import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { vendorRoute } from "../../utils/APIroutes";

import storage from '../../services/firebase';

function Dashboard() {
    const navigate = useNavigate();
    const[token,setToken]=useState();
    // const token = jwtDecode(JSON.parse(localStorage.getItem('food-delivery-token')));

    const [modal, setModal]=useState(false);
    const [percent, setPercent] = React.useState(0);
    const [selectedFile, setSelectedFile] = React.useState()
    const [imageURL, setImageURL] = React.useState()
    const [preview, setPreview] = React.useState()
    const[loading,SetLoading]=useState(true);
    
    const onSelectFile = e => { 
        if (!e.target.files || e.target.files.length === 0) { 
            setSelectedFile(undefined)
            return
        }
        setSelectedFile(e.target.files[0])
    }
    const handleUpload = async(event) => {
        event.preventDefault();
        if (!selectedFile) {
            alert("Please upload an image first!");
        }
        else{
        const storageRef = ref(storage, `/restaurants/${token.id}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
 
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
 
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            async () => {
                try{
                    const url=await getDownloadURL(uploadTask.snapshot.ref);
                    const urlFinal = url.split("%2F");
                    setImageURL(urlFinal.pop());
                }
                catch(error){
                    console.log("error getting the url:", error);
                }
            }
        );
        }
    };
    const submitProduct=async(event)=>{
        // write code to update imageUrl to the backend vendor profile picture
        const token = JSON.parse(localStorage.getItem('food-delivery-token'));
        const decodedToken = jwtDecode(token)
        const url = vendorRoute+"/imageUpdate/"+decodedToken.id
        const res = await axios.patch(url, {token: token, image: imageURL})
        window.alert("Edited")
        
        
        // window.location.reload();
    }
    useEffect(() => {
        if(localStorage.getItem("food-delivery-token"))
        {
            const token = jwtDecode(JSON.parse(localStorage.getItem('food-delivery-token')));
            setToken(token)
            if(token.userRole != "vendor"){
                navigate("/login");
            }
        }
        else {navigate("/login");}
        SetLoading(false);

        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])
    if(loading) return ( <div> Loading</div> )
    return (
        <div>
            {/* restaurant provbile image and name part */}
            <div className="dashboard_topDiv">
                <div style={{display:'flex', gap:'1.5rem', alignItems:'flex-end', width:'100%'}}>
                    <img  src={process.env.PUBLIC_URL + '/images/unavailable.jpg'} alt="Product" />   {/* write src address from backend */}
                    <h1> {token.userID}</h1>                         {/* write restaurant name from backend */}
                    <Button 
                        onClick={()=> setModal(!modal)}
                        style={{ marginLeft: 'auto', backgroundColor:'#584b95' }}> 
                        Update Restaurant Image
                    </Button>
                    { modal && <div className="profileModal">
                        <div className="profileOverlay" >
                            <div className="VendorImageModal-content">
                            <div> 
                                <input style={{marginTop:'1.5rem', padding:'10px'}} type="file" id="image" name="image" accept="image/*"onChange={onSelectFile}  required/>
                                {selectedFile && <img style={{width : '10rem', height:'10rem', padding: '10px'}} src={preview} alt ="food item image" />}
                                
                                <div style={{display:'flex', gap :"1rem", padding: '10px'}}>
                                    <Button onClick={handleUpload} size="sm"> Upload image</Button> 
                                    
                                </div>
                            </div>
                                <Button className="profileClosebtn" style={{backgroundColor:'#584b95'}}
                                    onClick={()=> setModal(!modal)}>
                                    <i class="fa-solid fa-xmark"></i>
                                </Button>
                                <Button onClick={submitProduct} style={{width:'100%', marginTop:'2rem',marginBottom:'1rem', backgroundColor:'#584b95'}}>UPDATE</Button>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>

            {/* dashboard content */}
        </div>
    );
}

export default Dashboard;