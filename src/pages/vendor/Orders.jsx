import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { jwtDecode } from 'jwt-decode'

import vendorOrder from '../TryData/vendorOrder';
import { completedOrderRoute } from '../../utils/APIroutes';

function Orders() {

    const[orderLoading, setOrderLoading]=useState(true);
    const[orders,setOrders]=useState([]);

    const fetchOrders= async()=>{
        try {
            const tokens = jwtDecode(JSON.parse(localStorage.getItem('food-delivery-token')));
            const url= completedOrderRoute.concat("/").concat(tokens.id);
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
        fetchOrders();
    })
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
    const totalPriceTemplate = (rowData) => {
        const total = rowData.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        return <span>₹ {total}</span>;
    };

    if(orderLoading) return ( <div> Loading..</div> )
    return (
        <div>
            <div className="menuDiv" >
                <h1>Past Orders</h1>
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
                        <Column field ="phone" header="Phone No." ></Column>
                        <Column field="address" header="address"  style={{width:"18%"}}></Column>
                        <Column field ="paymentMode" header="Payment" ></Column>
                        <Column header="Items" body={totalPriceTemplate}></Column>
                    </DataTable>
                    </>
                    :
                    <><div> You do not have any past orders</div></>
                    }
            </div>
        </div>
    );
}

export default Orders;