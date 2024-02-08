import React , {useState} from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Button from 'react-bootstrap/Button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";

import requests from "../TryData/pendingRequest";

const Restaurants= ()=>{
    const handleDeleteRow = async (rowData) => {
        const isConfirmed = window.confirm(`Are you sure you want to Delete ${rowData.shopname}?`);
        if (isConfirmed) {
          alert("Deleted");
        } 
    };
    const buttonTemplate = (rowData) => {
        return (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="danger" size="sm" style={{ width: '100px' }}
                    onClick={() => handleDeleteRow(rowData)}
                >Delete
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
        <div>
            <div className="menuDiv" >
                <h1>All Restaurants</h1>
                <br/>
                <DataTable value={requests} 
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
    )
};
export default Restaurants;