import React , {useEffect, useState} from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Button from 'react-bootstrap/Button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import axios from "axios";

import { unverifiedRoute } from "../../utils/APIroutes";

const Dashboard=()=>{
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
        allRequests();
    },[]);

    const handleApproveRow = async (rowData) => {
        const isConfirmed = window.confirm(`Are you sure you want to Approve ${rowData.shopname}?`);
        if (isConfirmed) {
          alert("approved");
        } 
      };
    const handleDeclineRow = async (rowData) => {
        const isConfirmed = window.confirm(`Are you sure you want to Decline ${rowData.shopname}?`);
        if (isConfirmed) {
          alert("Declined");
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
            </div>
        </div>
        }
        </>
    )
};

export default Dashboard;