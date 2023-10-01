import React, {  useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from '@mui/material/Button';
import './customerlist.css'
import Addcustomer from './Addcustomer.js';
import EditCustomer from './EditCustomer';
import Addtraining from './Addtraining';

export default function Customerlist() {
    const [customers, setCustomers] = useState([]);
    

    useEffect(() => 
        fetchData()
    , [])

    const fetchData = () => {
        fetch('http://traineeapp.azurewebsites.net/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
    }

    
    const saveCustomer = customer => {
        console.log(customer)
        fetch('http://traineeapp.azurewebsites.net/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(customer)
        })
          .then(resp => fetchData())
            .catch(err => console.log(err))
    }

    const updateCustomer = (data,customer) => {
        const link = data;

         fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(customer)
        })
          .then(resp => fetchData())
            .catch(err => console.log(err))
    } 

    const deleteCustomer = (params) => {
        if (!window.confirm("Sure you want to delete customer?")) return;

        const link = params.value[0].href
        fetch(link, { method: 'DELETE' })
          .then(res => fetchData())
            .catch(err => console.error(err))
    }

    const saveTraining = training => {
        console.log(training)
        fetch('http://traineeapp.azurewebsites.net/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(training)
        })
          .then(resp => fetchData())
            .catch(err => console.log(err))
    }


   
    
    const columns = [
        { field: "firstname", filter: 'agTextColumnFilter'},
        { field: "lastname", filter: 'agTextColumnFilter'},
        { headerName:"Street address", field: "streetaddress", filter: 'agTextColumnFilter'},
        { field: "postcode", filter: 'agTextColumnFilter'},
        { field: "city", filter: 'agNumberColumnFilter' },
        { field: "email", filter: 'agTextColumnFilter' },
        { field: "phone", filter: 'agNumberColumnFilter' },
        {
            headerName: "Edit", sortable: 'false', field: "links", cellRenderer: params => {
                return (
                <EditCustomer data={params.data} updateCustomer={updateCustomer} />
            )
            }
        },
        {
            headerName: "Add training", sortable: 'false', field: "links", cellRenderer: params => {
                return (
                    <Addtraining data={params.data} saveTraining={saveTraining} />
                )
            }
            },
            {
                headerName: "Delete", sortable: 'false', field: "links", cellRenderer: params => {
                    return (
                    <Button variant="contained" color="error" size="small" onClick={() => deleteCustomer(params)}>Delete</Button>
                )
                }
            
        }
        
    ]
    const defaultColDef = {
        sortable: true,
        floatingFilter: true,
    };

    
    return (
       
        <div className="App">
            <h2>Customers</h2>
            <Addcustomer saveCustomer={saveCustomer} />
            <div className="ag-theme-material"
                style={{ height: '700px', width: 'auto', margin: 'auto'}} >
            

               
<AgGridReact
                columnDefs={columns}
                defaultColDef={defaultColDef}
                animateRows={true}
                    rowData={customers}>
                    
    
               
</AgGridReact>
        </div>
        </div>
    );
}