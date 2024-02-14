import React , {useEffect, useState} from "react";
import { DataTable } from 'primereact/datatable';
import { useNavigate } from 'react-router-dom';
import { Column } from 'primereact/column';
import Button from 'react-bootstrap/Button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode'
import axios from "axios";
import { profileHost } from "../../utils/APIroutes";

import { unverifiedRoute } from "../../utils/APIroutes";

const Dashboard=()=>{
    const navigate = useNavigate();

    const[request,setRequest]=useState([{}]);
    const [loading, setLoading] = React.useState(true);
    const [token,setToken]=useState();
    const allRequests = async () => {
        try {
            const res = await axios.get(unverifiedRoute, {crossDomain: true});
            const items = res.data;
            setRequest(items);
            setRequest((state) => {
                return state;
            });
            setLoading(false);
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
            if(token.userRole != "admin"){
                navigate("/adminlogin");
            }
            allRequests();            
        }
        else {navigate("/adminlogin");}
    },[]);

    const handleApproveRow = async (rowData) => {
        const isConfirmed = window.confirm(`Are you sure you want to Approve ${rowData.shopname}?`);
        if (isConfirmed) {
          try{
          const response = await axios.patch(profileHost+"/api/admin/"+rowData._id, {crossDomain: true})
          toast.success("Approved.");
          allRequests()
        }
        catch(err){
            console.log(err)
        }
        } 
      };
    const handleDeclineRow = async (rowData) => {
        const isConfirmed = window.confirm(`Are you sure you want to Decline ${rowData.shopname}?`);
        if (isConfirmed) {
        try{
          const response = await axios.delete(profileHost+"/api/admin/"+rowData._id, {crossDomain: true})
          console.log(response)
          toast.success("Declined.");
          allRequests()
        }
        catch (err){
            console.log(err)
        }
        } 
    };
    const buttonTemplate = (rowData) => {
        return (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="success" size="sm" style={{ marginRight:'1rem', width: '100px' }}
                    onClick={() => handleApproveRow(rowData)}
                >Approve
                </Button>
                
                <Button
                    variant="danger" size="sm" style={{ width: '100px' }}
                    onClick={() => handleDeclineRow(rowData)}
                >Decline
                </Button>
            </div>
        );
    };
    // filter functionality
    const [filters, setFilters] = useState({
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        shopname: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    return(
        <>
        { (loading)? 
        <div> Loading</div>
        :
        <div>
            {/* <div className="dashboard_topDiv"  style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}> */}
               
                    <h1 className="menuDiv">ADMIN</h1>
                    {/* <div style={{alignSelf:'flex-start'}}>
                    <h4 style={{margin: '0'}}>Riyanshi Goyal</h4>
                    <p>riyanshigoyal@iitbhilai.ac.in</p>
                    </div> */}
            {/* </div> */}
            <div className="menuDiv" >
                <h2>Pending Requests</h2>
                <br/>
                {(request)?
                <>
                <DataTable value={request} 
                    paginator rows={10} rowsPerPageOptions={[10, 25, 50]} 
                    stripedRows
                    dataKey="id" filters={filters} filterDisplay="row" 
                    globalFilterFields={['name', 'shopname']} emptyMessage="No items found."
                    >

                    <Column field="shopname" header="Shop Name" showFilterMenu={false} filter filterPlaceholder="Search" ></Column>
                    <Column field="name" header="Vendor" showFilterMenu={false} filter filterPlaceholder="Search"  ></Column>
                    <Column field ="phone" header="Phone No." ></Column>
                    <Column body={buttonTemplate}></Column>
                </DataTable>
                <ToastContainer/>
                </>
                :
                <><div> You do not have any pending requests currently</div></>
                }
            </div>
        </div>
        }
        </>
    )
};

export default Dashboard;