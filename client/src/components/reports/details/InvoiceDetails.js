import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import api from "../../../api/api";
import ReportListRow from "../ReportListRow";
import InvoiceDetailsListRow from "./InvoiceDetailsListRow";

function InvoiceDetails(props) {

    const location = useLocation()
    const report = location.state.report;
    const navigate = useNavigate();

    console.log(report)

    //alert state
    const [open, setOpen] = useState(false);
    //dialog state

    const [alertType, setAlertType] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [loadingProgress, setLoadingProgress] = useState(false);
    const [invoiceItems, setInvoiceItems] = useState([])
// ss

    const handleAlertClose = () => {
        setOpen(false);
        setAlertMessage('')
        setAlertType('')
    };

    // retrieve data
    const retrieveData = () => {
        api.get('/invoice_details/' + report.id
        )
            .then(function (response) {
                // console.log(response.data)
                if (response.data.error === false) {

                    // console.log(response.data.users)
                    setInvoiceItems(response.data.invoice_details)

                } else {
                    // console.log("sjs")
                    // return [];
                    setAlertType('error')
                    setAlertMessage(response.data.message)
                    setOpen(true)

                }

            })
            .catch(function (error) {
                if (error.response.status === 401) {
                    navigate('/login')
                    //place your reentry code
                    console.log('Unauthorised')
                    sessionStorage.removeItem('status')
                    sessionStorage.removeItem('jwt_token')
                } else {
                    console.log('unknown error')
                    window.sessionStorage.setItem('status', false)
                }
            });
    }


    useEffect(() => {
        retrieveData();
    }, [])

    // const renderList = branches.map((branch) => {
    //     return (
    //         <option key={branch.id} value={branch.id} >{branch.branch_name}</option>
    //     );
    // })
    let count = 0;
    const renderInvoiceItemsList = invoiceItems.map((invoiceItem) => {
        count++
        return (
            <InvoiceDetailsListRow count={count} key={invoiceItem.id} invoiceItem={invoiceItem}
            ></InvoiceDetailsListRow>
        );
    })

    return (
        <div className="container">
            <div className="page-header text-blue-d2">
                <div className="page-tools ">
                    <div className="action-buttons ">
                        <a className=" btn bg-white btn-light" href="#" data-title="Print">
                            <i className="mr-1 fa fa-print text-primary-m1 text-120 w-2"></i>
                            Print
                        </a>
                        <a className=" btn bg-white btn-light " href="#" data-title="PDF">
                            <i className="mr-1 fa fa-file-pdf-o text-danger-m1 text-120 w-2"></i>
                            Export
                        </a>

                        <a className=" btn bg-white btn-light " href="#" data-title="Excel">
                            <i className="mr-1 fa fa-file-excel-o text-success text-120 w-2"></i>
                            Export
                        </a>

                    </div>
                </div>
            </div>

            <div className="container px-2 py-2 bg-white " >
                <div className="row mt-4">
                    <div className="col-12 col-lg-10 offset-lg-1">
                        <div className="row">
                            <div className="col-12">
                                <div className="text-center text-150">
                                    <img src="http://xerographics.test/assets/img/brand/logo.png"
                                         className="navbar-brand-img"
                                         alt="Logo"/>
                                </div>
                            </div>
                        </div>
                        {/*// <!-- .row -->*/}

                        <hr className="row brc-default-l1 mx-n1 mb-4"/>

                        <div className="row">
                            <div className="col-sm-6">
                                <div>
                                    <span className="text-sm  align-middle"></span>
                                    <span
                                        className="text-600 text-110 text-blue align-middle">{report.customer_name}</span>
                                </div>
                                <div className="">
                                    <div className="my-1">
                                        {report.address}
                                    </div>

                                    <div className="my-1"><i className="fa fa-phone fa-flip-horizontal"></i> <b
                                        className="text-600">{report.customer_phone}</b></div>
                                </div>
                            </div>
                            {/*// <!-- /.col -->*/}

                            <div className="text-95 col-sm-6 align-self-start d-sm-flex justify-content-end">
                                <hr className="d-sm-none"/>
                                <div className="">
                                    <div className="mt-1 mb-2 text-secondary-m1 text-600 text-125">
                                        Invoice
                                    </div>

                                    <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i>
                                        <span className="text-600 text-90">ID:</span> #{report.id}
                                    </div>

                                    <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i>
                                        <span className="text-600 text-90"> Date:</span> {report.created_at}

                                    </div>

                                    <div className="my-2"><i className="fa fa-circle text-blue-m2 text-xs mr-1"></i>
                                        <span
                                            className="text-600 text-90">Payment Type:</span> {report.payment_type}
                                    </div>
                                </div>
                            </div>
                            {/*// <!-- /.col -->*/}
                        </div>

                        <div class="table-responsive mt-3">
                            <table class="table table-striped table-borderless border-0 border-b-2 brc-default-l1">
                                <thead class="bg-primary">
                                <tr class="text-white">
                                    <th class="">#</th>
                                    <th>Description</th>
                                    <th>Qty</th>
                                    <th>Item Price (MWK)</th>
                                    <th width="140"> Total Amount (MWK)</th>
                                </tr>
                                </thead>

                                <tbody class="text-95 text-secondary-d3">

                                {renderInvoiceItemsList}
                                </tbody>
                            </table>
                        </div>
                        <hr/>

                        <div class="row mt-3">
                            <div class="col-12 col-sm-5 text-grey-d2 text-95 mt-2 mt-lg-0">
                                {/*{{--  Extra note such as company or payment information... --}}*/}
                            </div>

                            <div class="col-12 col-sm-7  ">
                                <div class="row my-2 align-items-center bgc-primary-l3 p-2">
                                    <div class="col-7 text-justify opacity-3">
                                        SubTotal <small>MWK</small>
                                    </div>
                                    <div class="col-5">
                                        <span class="text-100 text-secondary-d1 opacity-3">{report.total_before_disc_tax}</span>
                                    </div>
                                </div>

                                <div class="row my-2 align-items-center bgc-primary-l3 p-2">
                                    <div class="col-7 text-justify opacity-3">
                                        Discount <small>(%)</small>
                                    </div>
                                    <div class="col-5">
                                        <span class="text-100 text-secondary-d1 opacity-3">{report.discount_percent}</span>
                                    </div>
                                </div>

                                <div class="row my-2 align-items-center bgc-primary-l3 p-2">
                                    <div class="col-7 text-justify opacity-3">
                                        Tax <small>(MWK)</small>
                                    </div>
                                    <div class="col-5">
                                        <span class="text-100 text-success-d3 opacity-3">{report.total_tax}</span>
                                    </div>
                                </div>

                                <div className="row my-2 align-items-center bgc-primary-l3 p-2">
                                    <div className="col-7 text-justify">
                                        Total <small>(MWK)</small>
                                    </div>
                                    <div className="col-5">
                                        <span className="text-100 text-success-d3 ">{report.total_after_disc_tax}</span>
                                    </div>
                                </div>

                                <div class="row my-2 align-items-center bgc-primary-l3 p-2">
                                    <div class="col-7 text-justify">
                                        Paid Amount <small>(MWK)</small>
                                    </div>
                                    <div class="col-5">
                                        <span class="text-100 text-success-d3 ">{report.paid_amount}</span>
                                    </div>
                                </div>

                                <div className="row my-2 align-items-center bgc-primary-l3 p-2">
                                    <div className="col-7 text-justify">
                                        Amount Due/Change <small>(MWK)</small>
                                    </div>
                                    <div className="col-5">
                                        <span className="text-100 text-success-d3 ">{report.amount_due}</span>
                                    </div>
                                </div>


                            </div>
                        </div>

                        <hr/>

                        <div>
                            <span class="text-secondary-d1 text-105 py-5">Thank you for your business</span>
                            <br/><br/>
                            <p class="text-secondary-d1 text-105 py-5 text-center"><small>Invoice was created on a
                                computer and is valid without the signature and seal.</small></p>
                            <br/>
                            <br/>
                            <br/>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default InvoiceDetails;