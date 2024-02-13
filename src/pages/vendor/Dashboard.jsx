import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import {ref,uploadBytesResumable,getDownloadURL} from "firebase/storage";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { vendorRoute } from "../../utils/APIroutes";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import io from "socket.io-client";

import storage from '../../services/firebase';
import { getOrderRoute ,orderHost, OrderStatusRoute } from '../../utils/APIroutes';

function Dashboard() {
    const socket=io.connect(orderHost);
    // const resID=100; for testing

    const navigate = useNavigate();
    const[token,setToken]=useState();

    const [modal, setModal]=useState(false);
    const [percent, setPercent] = React.useState(0);
    const [selectedFile, setSelectedFile] = React.useState()
    const [imageURL, setImageURL] = React.useState()
    const [preview, setPreview] = React.useState()
    const[loading,setLoading]=useState(true);
    const[orderLoading, setOrderLoading]=useState(true);
    const[vendor,setVendor]=useState();
    const[orders,setOrders]=useState([]);

    const vendorInfo = async () => {
        try {
            // const token = jwtDecode(JSON.parse(localStorage.getItem('food-delivery-token')));
            const url = vendorRoute.concat("/").concat((jwtDecode(JSON.parse(localStorage.getItem('food-delivery-token')))).id);
        
            const res = await axios.get(url, {crossDomain: true});
            const items = res.data;
            setVendor(items[0]);
            
            setLoading(false);
            if (!res.status === 200) {
                throw new Error(res.error);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    // image selection, upload and submit option
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
            toast.error("Please upload an image first!");
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
        if (!selectedFile) {
            toast.error("Please upload an image first!");
        }
        else{
            const token = JSON.parse(localStorage.getItem('food-delivery-token'));
            const decodedToken = jwtDecode(token)
            const url = vendorRoute+"/imageUpdate/"+decodedToken.id
            const res = await axios.patch(url, {token: token, image: imageURL})
            toast.success("Edited");
            
        }
    }
    // get the current orders 
    const fetchOrders= async()=>{
        try {
            const tokens = jwtDecode(JSON.parse(localStorage.getItem('food-delivery-token')));
            const url= getOrderRoute.concat("/").concat(tokens.id);
            const res = await axios.get(url, {crossDomain: true});
            const items = res.data;
            setOrders(items);
            setOrders((state) => {
                return state;
            });
            setOrderLoading(false);
            if (!res.status === 200) {
                throw new Error(res.error);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(()=>{
        if(localStorage.getItem("food-delivery-token"))
        {
            const token = jwtDecode(JSON.parse(localStorage.getItem('food-delivery-token')));
            setToken(token)
            if(token.userRole != "vendor"){
                navigate("/login");
            }
            vendorInfo();
            fetchOrders();
            const resID= token.id;
            socket.emit("addUser",{"role":"vendor", "id": resID});
        }
        else {navigate("/login");}
    },[]);

    useEffect(()=>{
        socket.on("receive_order",(data)=>{
            toast.success(`You have a new order from ${data.fullName}`)
            // setOrders([...orders,data]);
            fetchOrders();
        });
    },[socket]);

    // use effect to set the selected file to update profile image
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }
        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    // accept, decline, complete order button functionality
    const handleAcceptRow = async (rowData) => {
        const status={
            orderID:rowData._id,
            status: "confirm"
        }
        try{const res = await axios.post(OrderStatusRoute,status);}
        catch(err){toast.error("Error processing the order")}
        fetchOrders();
         
    };
    const handleDeclineRow = async (rowData) => {
        const isConfirmed = window.confirm(`Are you sure you want to decline this order ?`);
        if (isConfirmed) {
            const status={
                orderID:rowData._id,
                status: "denied"
            }
            try{
                const res = await axios.post(OrderStatusRoute,status);
                toast.success("The order request has been declined")
            }
            catch(err){toast.error("Error processing the order")}
            fetchOrders();
        } 
    };
    const handleCompletedRow = async (rowData) => {
        const status={
            orderID:rowData._id,
            status: "completed"
        }
        try{
            const res = await axios.post(OrderStatusRoute,status);
            toast.success("the order is succesfully completed")
        }
        catch(err){toast.error("Error processing the order")}
        fetchOrders();
    };
    const buttonTemplate = (rowData) => {
        if(rowData.status==="confirm"){
            return(
                <div style={{display: 'flex', flexDirection: 'column' ,alignItems:"center"}}>
                    <Button
                        variant="warning" size="sm" style={{ width: '100px' }} onClick={() => handleCompletedRow(rowData)}
                    >Completed
                    </Button>
                </div>
            )
        }
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button
                    variant="success" size="sm" style={{ marginBottom: '10px', width: '100px' }} onClick={() => handleAcceptRow(rowData)}
                >Accept
                </Button>

                <Button
                    variant="danger" size="sm" style={{ marginBottom: '10px', width: '100px' }}  onClick={() => handleDeclineRow(rowData)}
                >Decline
                </Button>
                
                <Button
                    variant="warning" size="sm" style={{ width: '100px' }}  onClick={() => handleCompletedRow(rowData)}
                >Completed
                </Button>
            </div>
        );
    };
    // ordered Food Items template
    const itemTemplate=(rowData)=>{
        return(
            <div>
            {rowData.items.map((item, index) => (
                <div key={index}>
                    <span>{item.orderid}: {item.quantity} x {item.price}</span>
                </div>
            ))}
        </div>
        )
    }
    
    if(loading || orderLoading) return ( <div> Loading</div> )
    return (
        <div>
            {/* restaurant provbile image and name part */}
            <div className="dashboard_topDiv" style={{display: 'flex'}}>
                <div style={{display:'flex', gap:'1.5rem', alignItems:'flex-end', width:'100%'}}>
                    <img  src={vendor.img} alt="Product" />  
                    <h1> {token.userID}</h1>                        
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
                                    <p>{percent} % done</p>
                                </div>
                            </div>
                                <Button className="profileClosebtn" style={{backgroundColor:'#584b95'}}
                                    onClick={()=> {setModal(!modal); vendorInfo(); }}>
                                    <i class="fa-solid fa-xmark"></i>
                                </Button>
                                <Button onClick={submitProduct} style={{width:'100%', marginTop:'2rem',marginBottom:'1rem', backgroundColor:'#584b95'}}>UPDATE</Button>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
            <ToastContainer />
            {/* dashboard content */}
            {/* current orders */}
            <div className="menuDiv" >
                    <h2 style={{marginTop:'1.5rem'}}>Current Orders</h2>
                    <br/>
                    {(orders)?
                    <>
                    <DataTable value={orders} 
                        paginator rows={10} rowsPerPageOptions={[10, 25, 50]} 
                        stripedRows
                        dataKey="id" 
                        >
                        <Column field="fullName" header="Customer" ></Column>
                        <Column header="Items" body={itemTemplate}></Column>
                        <Column field="instruction" header="Instructions"></Column>
                        <Column field ="phone" header="Phone No." ></Column>
                        <Column field="address" header="address"  style={{width:"15%"}}></Column>
                        <Column field ="paymentMode" header="Payment" ></Column>
                        <Column body={buttonTemplate}></Column>
                    </DataTable>
                    <ToastContainer/>
                    </>
                    :
                    <><div> You do not have any orders currently</div></>
                    }
            </div>
        </div>
    );
}

export default Dashboard;