import React , {useState, useEffect} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Button from 'react-bootstrap/Button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Dropdown } from 'primereact/dropdown';
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

import vendorMenu from '../TryData/vendorMenu';
import VendorAddItem from '../../components/VendorAddItem';
import VendorUpdateItem from '../../components/VendorUpdateItem';
import { itemRoute } from '../../utils/APIroutes';


function FMenu() {

    const token = jwtDecode(JSON.parse(localStorage.getItem('food-delivery-token')));
    const url = itemRoute.concat("/").concat(token.id)
    const [vendorMenuu, setVendorMenu] = React.useState([{}]);
    const [loading, setLoading] = React.useState(true);
    const [modalAdd, setModalAdd]=useState(false);
    const [modalUpdate, setModalUpdate]=useState(false);
    const [rowDataForUpdate, setRowDataForUpdate] = useState(null);

    const allItems = async () => {
        try {
            const res = await axios.get(url, {crossDomain: true});
            const items = res.data;
            // console.log("wohooo!!! " + res)
            setVendorMenu(items);
            setVendorMenu((state) => {
                // console.log("done!!!!");
                // console.log(vendorMenuu);
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
    // allItems();

    const handleDeleteRow = (rowData) => {
        const isConfirmed = window.confirm(`Are you sure you want to delete ${rowData.name}?`);

        // If the user clicks 'OK' in the confirmation dialog, proceed with the deletion
        if (isConfirmed) {
          // Implement logic to delete the row from the state or API
          window.alert(rowData.name + "this is the code" + rowData.code);
        } 
      };
    const handleEditRow = (rowData) => {
        // Implement logic to delete the row from the state or API
        setRowDataForUpdate(rowData);
        setModalUpdate(!modalUpdate);
    };
    

    // displaying image and price in the table
    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.img} alt={rowData.name} style={{ width: '100px', height: '100px' }} />;
      };
      const priceBodyTemplate = (rowData) => {
        return `₹ ${rowData.price}`; // Assuming price is a numeric value
      };
    const stockBodyTemplate=(rowData)=>{
        return (rowData.availability)? 'Available' : 'Unavailable';
    }
    
    const buttonTemplate = (rowData) => {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Button
                    variant="danger" size="sm" style={{ marginBottom: '10px', width: '100px' }}
                    onClick={() => handleDeleteRow(rowData)}
                >Delete
                </Button>
                
                <Button
                    variant="warning" size="sm" style={{ width: '100px' }}
                    onClick={() => handleEditRow(rowData)}
                >Edit
                </Button>
            </div>
        );
    };

    //   filter functionality
    const [filters, setFilters] = useState({
        name: { value: null, matchMode: FilterMatchMode.CONTAINS },
        category: { value: null, matchMode: FilterMatchMode.EQUALS },
        availability: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [statuses] = useState(['Unavailable', 'Available']);
    const categories = [... new Set(vendorMenuu.map(item => item.category))];

    const categoryRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={categories} onChange={(e) => options.filterApplyCallback(e.value)} placeholder="Select One" className="p-column-filter" showClear style={{ width: '10rem' }} />
        );
    };

    const [selectedStatus, setSelectedStatus] = useState(null);
    const stockRowFilterTemplate = (options) => {
        const dropdownOptions = [
            ...statuses.map((status) => ({ label: status, value: status })),
          ];
        return (
            <Dropdown value={selectedStatus} 
            options={dropdownOptions}
            onChange={(e) => {
                setSelectedStatus(e.value);
                options.filterApplyCallback(e.value === 'Available' ? true : e.value === 'Unavailable' ? false : '');
            }}
            placeholder="Select One" className="p-column-filter" showClear style={{ width: '10rem' }} />
        );
    };

    useEffect(() => {
        allItems();
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className='menudiv'>
            <h1>Menu</h1>
            <hr/>
            <Button onClick={()=> setModalAdd(!modalAdd)}>ADD AN ITEM</Button>
            { modalAdd && <div className="profileModal">
                <div className="profileOverlay" >
                    <div className="VendorAddModal-content">
                        <VendorAddItem/>
                        <Button className="profileClosebtn" style={{backgroundColor:'#584b95'}}
                            onClick={()=> {setModalAdd(!modalAdd); allItems(); }}>
                            <i class="fa-solid fa-xmark"></i>
                        </Button>
                    </div>
                </div>
            </div>}
            { modalUpdate && <div className="profileModal">
                <div className="profileOverlay" >
                    <div className="VendorAddModal-content">
                        <VendorUpdateItem rowDataForUpdate={rowDataForUpdate} />
                        <Button className="profileClosebtn" style={{backgroundColor:'#584b95'}}
                            onClick={()=> {setModalUpdate(!modalUpdate); allItems(); } }>
                            <i class="fa-solid fa-xmark"></i>
                        </Button>
                    </div>
                </div>
            </div>}

            <div style={{marginTop:'2rem'}}>
                {vendorMenuu ?
                <>
                <DataTable value={vendorMenuu} 
                    paginator rows={10} rowsPerPageOptions={[10, 25, 50]} 
                    stripedRows
                    tableStyle={{ minWidth: '60rem' }}
                    dataKey="id" filters={filters} filterDisplay="row" 
                    globalFilterFields={['name', 'category', 'stock']} emptyMessage="No items found.">

                    {/* <Column field="code" header="Code" style={{ width: '3%' }}></Column> */}
                    <Column field="name" header="Name" showFilterMenu={false} filter filterPlaceholder="Search" style={{ width: '13%' }}></Column>
                    <Column field="price" header="Price" body={priceBodyTemplate}></Column>
                    <Column field ="category" header="Category" showFilterMenu={false}  style={{ width: '10%' }} filter filterElement={categoryRowFilterTemplate}></Column>
                    <Column header="Image" body={imageBodyTemplate}></Column>
                    <Column field="description" header="Description" style={{ width: '16%' }}></Column>
                    <Column field ="availability" header="Availability" body={stockBodyTemplate} showFilterMenu={false}  style={{ width: '10%' }} filter filterElement={stockRowFilterTemplate}></Column>
                    <Column body={buttonTemplate}></Column>
                </DataTable>
                </>
                : 
                <>
                   <div> Your menu page is empty </div>
                </>
                }

            </div>
        </div>
    );
}

export default FMenu;