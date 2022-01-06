import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import api from "../../api/api";
import Alert from "../alerts/alert";


function UnitDetails(props) {
    const location = useLocation()
    const unit = location.state.unit;
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


    const [unit_name, setUnitName] = useState(unit.unit_name);
    const [unit_symbol, setUnitSymbol] = useState(unit.unit_symbol);

    const updateUnit = (e) => {
        // console.log("sjsjs")
        e.preventDefault()
        if (unit_name === "" || unit_symbol === "") {
            setOpen(true);
            setAlertMessage('All fields are mandatory')
            setAlertType('error')
        } else {
            const state = {
                eunit_name: unit_name,
                eunit_symbol: unit_symbol,
                eunit_id: unit.id
            }
            AddUnitHandler(state)
            setUnitName(unit.unit_name) // clear form fields 
            setUnitSymbol(unit.unit_symbol) // clear form fields 

        }
    }

    const AddUnitHandler = (state) => {
        console.log(state)

        api.put('/updateUnit'
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
                                            <li className="breadcrumb-item active" aria-current="page">Edit Unit Details</li>
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
                                <form onSubmit={updateUnit}>

                                    <input type="hidden" name="ecustomer_id" id="ecustomer_id" value={unit.id} required />

                                    <div className="row">


                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label >Unit Name <span className='text-danger'>*</span></label>
                                                <input value={unit_name} onChange={(e) => setUnitName(e.target.value)} type="text" className="form-control" placeholder="Ex: Kilograms" required />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label >Unit Symbol <span className='text-danger'>*</span></label>
                                                <input value={unit_symbol} onChange={(e) => setUnitSymbol(e.target.value)} type="text" className="form-control" placeholder="Ex: KG" required />
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

export default UnitDetails;