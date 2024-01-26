import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage";
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

import storage from '../../services/firebase';

function Dashboard() {
    const token = jwtDecode(JSON.parse(localStorage.getItem('food-delivery-token')));

    const [modal, setModal]=useState(false);
    const [selectedFile, setSelectedFile] = React.useState()
    const [imageURL, setImageURL] = React.useState()
    const [preview, setPreview] = React.useState()
    
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
        const storageRef = ref(storage, `/files/${selectedFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedFile);
        // getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        //     setImageURL(url);
        // });
        

        }
    };
    const submitProduct=async(event)=>{
        // write code to update imageUrl to the backend vendor profile picture
        window.location.reload();
    }
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

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