import React , {useState} from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Button from 'react-bootstrap/Button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Dropdown } from 'primereact/dropdown';
import vendorMenu from '../TryData/vendorMenu';
import VendorAddItem from '../../components/VendorAddItem';
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { itemRoute } from '../../utils/APIroutes';


function FMenu() {

    const token = jwtDecode(JSON.parse(localStorage.getItem('food-delivery-token')));
    const url = itemRoute.concat("/").concat(token.id)
    
    // axios.get(url, {crossDomain: true}).then((response) => {
    //     console.log(response.data[1].img)
    // })

    const handleDeleteRow = (rowData) => {
        // Implement logic to delete the row from the state or API
        window.alert(rowData.name+ "this is the code" + rowData.code);
      };
      const handleEditRow = (rowData) => {
        // Implement logic to delete the row from the state or API
        window.alert("Edited");
      };
    

    // displaying image and price in the table
    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.imageUrl} alt={rowData.name} style={{ width: '100px', height: '100px' }} />;
      };
      const priceBodyTemplate = (rowData) => {
        return `₹ ${rowData.price}`; // Assuming price is a numeric value
      };
    
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
        stock: { value: null, matchMode: FilterMatchMode.EQUALS }
    });
    const [statuses] = useState(['Unavailable', 'Available']);
    const categories = [... new Set(vendorMenu.map(item => item.category))];

    const categoryRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={categories} onChange={(e) => options.filterApplyCallback(e.value)} placeholder="Select One" className="p-column-filter" showClear style={{ width: '10rem' }} />
        );
    };

    const stockRowFilterTemplate = (options) => {
        return (
            <Dropdown value={options.value} options={statuses} onChange={(e) => options.filterApplyCallback(e.value)} placeholder="Select One" className="p-column-filter" showClear style={{ width: '10rem' }} />
        );
    };
    const [modal, setModal]=useState(false);

    return (
        <div className='menudiv'>
            <h1>Menu</h1>
            <hr/>
            <Button onClick={()=> setModal(!modal)}>ADD AN ITEM</Button>
            { modal && <div className="profileModal">
                <div className="profileOverlay" >
                    <div className="VendorAddModal-content">
                        <VendorAddItem/>
                        <Button className="profileClosebtn" style={{backgroundColor:'#584b95'}}
                            onClick={()=> setModal(!modal)}>
                            <i class="fa-solid fa-xmark"></i>
                        </Button>
                    </div>
                </div>
            </div>}

            <div style={{marginTop:'2rem'}}>
                <DataTable value={vendorMenu} 
                    paginator rows={10} rowsPerPageOptions={[10, 25, 50]} 
                    stripedRows
                    tableStyle={{ minWidth: '60rem' }}
                    dataKey="id" filters={filters} filterDisplay="row" 
                    globalFilterFields={['name', 'category', 'stock']} emptyMessage="No items found.">

                    <Column field="code" header="Code" style={{ width: '3%' }}></Column>
                    <Column field="name" header="Name" showFilterMenu={false} filter filterPlaceholder="Search" style={{ width: '13%' }}></Column>
                    <Column field="price" header="Price" body={priceBodyTemplate}></Column>
                    <Column field ="category" header="Category" showFilterMenu={false}  style={{ width: '10%' }} filter filterElement={categoryRowFilterTemplate}></Column>
                    <Column header="Image" body={imageBodyTemplate}></Column>
                    <Column field="description" header="Description" style={{ width: '16%' }}></Column>
                    <Column field ="stock" header="Availability" showFilterMenu={false}  style={{ width: '10%' }} filter filterElement={stockRowFilterTemplate}></Column>
                    <Column body={buttonTemplate}></Column>
                </DataTable>
            </div>
        </div>
    );
}

export default FMenu;