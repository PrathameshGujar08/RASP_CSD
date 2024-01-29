import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage";
import axios from 'axios'
import storage from "../services/firebase";
import { itemRoute } from "../utils/APIroutes";
import { jwtDecode } from 'jwt-decode'


// add item button funcationality in vendor menu page
function VendorUpdateItem({ rowDataForUpdate }) {

    const PreviousItemImg = rowDataForUpdate.img.split("%2F").pop();
    const [selectedFile, setSelectedFile] = React.useState()
    const [percent, setPercent] = React.useState(0);
    const [imageURL, setImageURL] = React.useState(PreviousItemImg);
    const [preview, setPreview] = React.useState(rowDataForUpdate.img)
    const PreviousItemName=rowDataForUpdate.name;       {/* use this for put request as name is unique*/}

    const [product,setProduct] =React.useState({
        name: rowDataForUpdate.name || "",
        description: rowDataForUpdate.description || "",
        price: rowDataForUpdate.price || 0,
        category: rowDataForUpdate.category || "",
        stock: rowDataForUpdate.stock || "Available",

    });
    function handleChange(event){
        const {name,value} = event.target;
        setProduct((prevvalue) =>{
            return {
                ...prevvalue,
                [name]:value
            };
        });
    }

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
                    console.log(imageURL);   
                }
                catch(error){
                    console.log("error getting the url:", error);
                }
            }
        );
        }
    };

    const submitProduct=async(event)=>{
        // console.log(product);
        // console.log("YAYAYA" + PreviousItemName);
        // console.log(imageURL);
        const token = jwtDecode(JSON.parse(localStorage.getItem('food-delivery-token')));
        const newProduct={
            name: product.name,
            description:product.description,
            price: product.price,
            category:product.category,
            stock : product.stock,
            img:imageURL
        }
        const config = {
            headers: {
                "Content-Type":'application/x-www-form-urlencoded'
            }
        }
        try{
            const url = itemRoute.concat("/").concat(token.id)
            const res = await axios.put(url+"/"+PreviousItemName, {"token": JSON.parse(localStorage.getItem('food-delivery-token')), "product":newProduct})
        
        window.alert("EDITED");
        
        } catch(error){
            console.log(error)
        }
    };
    useEffect(() => {
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile)
            setPreview(objectUrl)
            return () => URL.revokeObjectURL(objectUrl)
        }

       
    }, [selectedFile])


    return (
        <div >
            <h3>Update an Item</h3>
                <div style={{display:'flex', gap:'4rem'}}>
                    <div style={{width:'50%'}}>
                        <input className="cartInput" type="text"  placeholder="Item Name" name="name" onChange={handleChange} value={product.name} required/> 
                        <input className="cartInput" type="text"  placeholder="Category" name="category" onChange={handleChange} value={product.category} required/> 
                        <input className="cartInput" type="text"  placeholder="DSescription" name="description" onChange={handleChange} value={product.description} /> 
                        <div style={{display:'flex', gap:'2rem'}}>
                            <input className="cartInput" type="number"  placeholder="Price" name="price" onChange={handleChange} value={product.price}  required/> 
                            <Form.Select className="cartInput" name="stock" placeholder="Availability" onChange={handleChange} value={product.stock} required>
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </Form.Select>
                        </div>
                    </div>
                    <div> 
                        <input style={{marginTop:'1.5rem', padding:'10px'}} type="file" id="image" name="image" accept="image/*"onChange={onSelectFile}  required/>
                        {<img style={{width : '10rem', height:'10rem', padding: '10px'}} src={preview} alt ="food item image" />}
                        
                        <div style={{display:'flex', gap :"1rem", padding: '10px'}}>
                            <Button onClick={handleUpload} size="sm"> Upload image</Button> 
                            <p>{percent} % done</p>
                        </div>
                    </div>
                </div>
                {console.log(product)}
                    <Button onClick={submitProduct} style={{width:'100%', marginTop:'2rem',marginBottom:'1rem', backgroundColor:'#584b95'}}>PROCEED TO UPDATE</Button>
        </div>
    );
}


export default VendorUpdateItem;