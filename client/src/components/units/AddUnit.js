import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import api from "../../api/api";
import Alert from "../alerts/alert";


function AddUnit(props) {
    // console.log(user)

    const navigate = useNavigate();


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


    const [unit_name, setUnitName] = useState('');
    const [unit_symbol, setUnitSymbol] = useState('');


    const addUnit = (e) => {
        // console.log("sjsjs")
        e.preventDefault()
        if (unit_name === "" || unit_symbol === "") {
            setOpen(true);
            setAlertMessage('All fields are mandatory')
            setAlertType('error')
        } else {
            const state = {
                unit_name: unit_name,
                unit_symbol: unit_symbol
            }
            AddUnitHandler(state)
            setUnitName('') // clear form fields 
            setUnitSymbol('') // clear form fields 

        }
    }

    const AddUnitHandler = (state) => {
        console.log(state)

        api.post('/saveUnit'
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
                    setTimeout(() => { navigate('/units'); }, 1000)

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
            <div className="">
                <div className="header bg-primary pb-6">
                    <div className="container-fluid">
                        <div className="header-body">
                            <div className="row align-items-center py-4">
                                <div className="col-lg-6 col-7">
                                    <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
                                        <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                            <li className="breadcrumb-item"><Link to={"/"}><i className="fas fa-home"></i></Link></li>
                                            <li className="breadcrumb-item active" aria-current="page"><Link to={'/units'}>Units</Link></li>
                                            <li className="breadcrumb-item active" aria-current="page">Add Unit</li>
                                        </ol>
                                    </nav>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="container-fluid mt--6">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="container-fluid mt-5">
                                <form onSubmit={addUnit}>


                                    <div className="row">


                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label >Unit Name <span className='text-danger'>*</span></label>
                                                <input value={unit_name} onChange={(e) => setUnitName(e.target.value)} type="text" className="form-control" name="efname" id="efname" placeholder="Ex: Kilogram" required />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label >Unit Symbol <span className='text-danger'>*</span></label>
                                                <input value={unit_symbol} onChange={(e) => setUnitSymbol(e.target.value)} type="text" className="form-control" name="elname" id="elname" placeholder="Ex: KG" required />
                                            </div>
                                        </div>





                                    </div>

                                    <div className="modal-footer">
                                        <button type="submit" id="btn_add" className="btn btn-primary">Save</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Alert openAlert={open} alertMessage={alertMessage} alertType={alertType} handleAlertClose={handleAlertClose} />
        </div>
    );
}

export default AddUnit;