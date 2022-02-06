import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import React from "react";
import UnitListRow from "./UnitListRow";
import api from "../../api/api";
import Alert from "../alerts/alert";
import Dialogs from "../alerts/dialog";


function Units() {
    //user state
    const [units, setUnits] = useState([])
    const [del_id, setId] = useState(-1)

    //alert state
    const [open, setOpen] = useState(false);
    //dialog state
    const [dialogOpen, setDialogOpen] = useState(false);


    //dialog open
    const handleClickOpen = (id) => {
        setDialogOpen(true);
        setDialogTitle('Delete')
        setDialogMessage('Are you sure to delete unit?')
        setId(id)
    };


    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogMessage, setDialogMessage] = useState("");



    const handleAlertClose = () => {
        setOpen(false);
        setAlertMessage('')
        setAlertType('')
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setDialogTitle('')
        setDialogMessage('')
    };


    // retrieve customers
    const retrieveUnits = () => {
        api.get('/fetchAllUnits'

        )
            .then(function (response) {
                // console.log(response.data)
                if (response.data.error === false) {

                    // console.log(response.data.users)
                    setUnits(response.data.units)
                    // return response.data.users;

                } else {
                    // console.log(response.data.message)
                    // return [];
                    setAlertType('error')
                    setAlertMessage(response.data.message)
                    setOpen(true)
                }

            })
            .catch(function (error) {
                setAlertType('error')
                setAlertMessage("Error 500: Internal server error")
                setOpen(true)
            });
    }

    //delete customer
    const dialogAction = () => {
        setOpen(false)
        setId(-1)
        if (del_id > 0) {
            console.log("ID: " + del_id);
            api.delete('/deleteUnit/' + del_id + ''

            )
                .then(function (response) {
                    // console.log(response.data)
                    if (response.data.error === false) {

                        const unitsCopy = units.filter((unit) => {
                            return unit.id !== del_id
                        })
                        handleDialogClose();
                        setUnits(unitsCopy)
                        setAlertType('success')
                        setAlertMessage('Unit deleted successfully')
                        setOpen(true)


                    } else {
                        console.log(response.data.message)
                        // return [];
                        setAlertType('error')
                        setAlertMessage(response.data.message)
                        setOpen(true)
                    }

                })
                .catch(function (myJson) {
                    console.log(myJson);
                    setAlertType('error')
                    setAlertMessage("Error 500: Internal server error")
                    setOpen(true)
                });
        } else {

        }

    }

    useEffect(() => {
        retrieveUnits();
    }, [])

    const renderUnitList = units.map((unit) => {
        return (
            <UnitListRow key={unit.id} unit={unit} getDeleteUnitId={handleClickOpen} ></UnitListRow>
        );
    })

    return (
        <div className="">
            <div className="header bg-primary pb-6">
                <div className="container-fluid">
                    <div className="header-body">
                        <div className="row align-items-center py-4">
                            <div className="col-lg-6 col-7">
                                <nav aria-label="breadcrumb" className="d-none d-md-inline-block ml-md-4">
                                    <ol className="breadcrumb breadcrumb-links breadcrumb-dark">
                                        <li className="breadcrumb-item"><Link to={"/"}><i className="fas fa-home"></i></Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Units</li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-lg-6 col-5 text-right">

                                <Link to={'addUnit'} >
                                    <button type="button" className="btn btn-sm btn-neutral my-1">New Unit</button>
                                </Link>

                            </div>


                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid mt--6">
                <div className="row">
                    <div className="col">
                        <div className="card">

                            <div className="table-responsive mt-4" id="">
                                <table className="table table-hover mt-3 " id="users_tbl" >
                                    <thead className="thead">
                                        <tr>
                                            <th >Unit Name</th>
                                            <th >Unit Symbol</th>
                                            <th >Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="">
                                        {renderUnitList}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Dialogs dialogOpen={dialogOpen} dialogAction={dialogAction} dialogTitle={dialogTitle} dialogMessage={dialogMessage} handleDialogClose={handleDialogClose} />
            <Alert openAlert={open} alertMessage={alertMessage} alertType={alertType} handleAlertClose={handleAlertClose} />
        </div>
    );
}

export default Units;
