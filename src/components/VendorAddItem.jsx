import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage";
import axios from 'axios'
import storage from "../services/firebase";
import { itemRoute } from "../utils/APIroutes";


// add item button funcationality in vendor menu page
function VendorAddItem() {
    const [selectedFile, setSelectedFile] = React.useState()
    const [percent, setPercent] = React.useState(0);
    const [imageURL, setImageURL] = React.useState()
    const [preview, setPreview] = React.useState()

    const [product,setProduct] =React.useState({
        name: "",
        description:"",
        price: Number,
        category:"",
        stock : "Available",
        img:""

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
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    var urlFinal = url.split("%2F")
                    setImageURL(urlFinal.pop());
                    
                    setProduct({
                        ...product,
                        img: imageURL,
                    })
                });
            }
        );
        }
    };

    const submitProduct=async(event)=>{
        const token = JSON.parse(localStorage.getItem('food-delivery-token'));
        const config = {
            headers: {
                "Content-Type":'application/x-www-form-urlencoded'
            }
        }
        try{
        const response = await axios.post(
            itemRoute, {"token": token, "product":product}
        )
        window.alert("ADDED")
        } catch(error){
            console.log(error)
        }
        // event.preventDefault();
        // const newProduct={
        //     // id:productId,
        //     name: product.name,
        //     description:product.description,
        //     price:product.price,
        //     category:product.category,
        //     quantity:product.quantity,

        //     token:tokens,
        //     image:imageURL
        // }
        
        // try {
        //     const config={
        //         headers: {
        //             "Content-Type":"application/json"
        //         }
        //     };
        //     const {data}= await axios.post(
        //         process.env.REACT_APP_BACKEND_URL+"api/users/product/update",newProduct,config
        //     );
        //     window.alert("New product updated successfully");
        // } catch (error) {
        //     console.log(error.response.data);
        // }
    };
    useEffect(() => {

        // const user = JSON.parse(localStorage.getItem('userInfo'));
        // if (user) {
        //  setToken(user.token);
        // }

        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

     
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])


    return (
        <div >
            <h3>Add an Item</h3>
                <div style={{display:'flex', gap:'4rem'}}>
                    <div style={{width:'50%'}}>
                        <input className="cartInput" type="text"  placeholder="Item Name" name="name" onChange={handleChange} value={product.name} required/> 
                        <input className="cartInput" type="text"  placeholder="Category" name="category" onChange={handleChange} value={product.category} required/> 
                        <input className="cartInput" type="text"  placeholder="description" name="description" onChange={handleChange} value={product.description} /> 
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
                        {selectedFile && <img style={{width : '10rem', height:'10rem', padding: '10px'}} src={preview} alt ="food item image" />}
                        
                        <div style={{display:'flex', gap :"1rem", padding: '10px'}}>
                            <Button onClick={handleUpload} size="sm"> Upload image</Button> 
                            <p>{percent} "% done"</p>
                        </div>
                    </div>
                </div>
                {console.log(product)}
                    <Button onClick={submitProduct} style={{width:'100%', marginTop:'2rem',marginBottom:'1rem', backgroundColor:'#584b95'}}>PROCEED TO ADD</Button>
        </div>
    );
}


export default VendorAddItem;