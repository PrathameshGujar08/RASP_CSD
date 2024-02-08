import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";

import vendorOrder from '../TryData/vendorOrder';

function Orders() {
    return (
        <div>
            <div className="menuDiv" >
                <h1>Past Orders</h1>
                <br/>
                <DataTable value={vendorOrder} 
                    paginator rows={10} rowsPerPageOptions={[10, 25, 50]} 
                    stripedRows dataKey="id"
                    // dataKey="id" filters={filters} filterDisplay="row" 
                    // globalFilterFields={['name', 'shopname']} emptyMessage="No items found."
                    >

                    <Column field="time" header="Time" ></Column>
                    <Column field="foodItems" header="Items" ></Column>
                    <Column field="name" header="Name"  ></Column>
                    <Column field ="phone" header="Phone No." ></Column>
                    <Column field ="address" header="Address" ></Column>
                    <Column field ="total" header="Total" ></Column>
                    <Column field ="suggestions" header="Suggestions" ></Column>
                    <Column field ="payment" header="Payment Mode" ></Column>

                </DataTable>
            </div>
        </div>
    );
}

export default Orders;