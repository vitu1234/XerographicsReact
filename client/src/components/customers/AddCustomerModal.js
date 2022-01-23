import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import api from "../../api/api";
import Alert from "../alerts/alert";
import { useEffect, useState } from 'react';



export default function AddCustomerModal(props) {

    console.log(props)

    //alert state
    const [open, setOpen] = useState(false);
    //dialog state

    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const handleAlertClose = () => {
        setOpen(false);
        setAlertMessage('')
        setAlertType('')
    };


    const [customer_name, setName] = useState('');
    const [customer_phone, setPhone] = useState('');
    const [address, setAddress] = useState('');


    const addCustomer = (e) => {
        // console.log("sjsjs")
        e.preventDefault()
        if (customer_name === "" || customer_phone === "") {
            setOpen(true);
            setAlertMessage('All fields are mandatory')
            setAlertType('error')
        } else {
            const state = {
                customer_name: customer_name,
                customer_phone: customer_phone,
                customer_address: address
            }
            AddCustomerHandler(state)
            setName('') // clear form fields 
            setPhone('') // clear form fields 
            setAddress('') // clear form fields 


        }
    }

    const AddCustomerHandler = (state) => {
        console.log(state)

        api.post('/saveCustomer'
            , state, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',

            }
        }
        )
            .then(function (response) {
                // console.log(response.data)
                if (response.data.error == false) {

                    // console.log(response.data.users)
                    // return response.data.users;
                    setAlertType('success')
                    setAlertMessage(response.data.message)
                    setOpen(true)

                    props.handleDialogClose()
                    props.handleContactUpdate()
                    // setTimeout(() => { navigate('/customers'); }, 1000)

                } else {
                    // console.log(response.data.message)
                    // return [];
                    setAlertType('error')
                    setAlertMessage(response.data.message)
                    setOpen(true)
                }

            })
            .catch(function (error) {
                console.log(error);
                setAlertType('error')
                setAlertMessage("Error 500: Internal server error")
                setOpen(true)
            });
    }



    return (
        <div>

            <Dialog open={props.dialogOpen} onClose={props.handleDialogClose}>
                <DialogTitle>Add Customer</DialogTitle>
                <DialogContent>
                    <form onSubmit={addCustomer}>


                        <div className="row">


                            <div className="col-md-6">
                                <div className="form-group">
                                    <label >Customer Name <span className='text-danger'>*</span></label>
                                    <input value={customer_name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" name="efname" id="efname" placeholder="Ex: John" required />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label >Customer Phone <span className='text-danger'>*</span></label>
                                    <input value={customer_phone} onChange={(e) => setPhone(e.target.value)} type="text" className="form-control" name="elname" id="elname" placeholder="Ex: +26588299292" required />
                                </div>
                            </div>



                            <div className="col-md-12">
                                <div className="form-group">
                                    <label >Address</label>
                                    <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" placeholder="Ex: Area 25 sector 3" ></textarea>
                                </div>
                            </div>

                        </div>

                        <div className="modal-footer">
                            <button type="submit" id="btn_add" className="btn btn-primary">Save</button>
                        </div>

                    </form>
                </DialogContent>
            </Dialog>
            <Alert openAlert={open} alertMessage={alertMessage} alertType={alertType} handleAlertClose={handleAlertClose} />

        </div>
    );
}
