import React, {useEffect} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import faker from 'faker';
import ReportListRow from "../reports/ReportListRow";
import GraphLinear from "./GraphLinear";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            // position: 'top' as const
        },
        title: {
            display: false,
            text: 'Chart.js Bar Chart',
        },
    },
};


function Analytics(props) {

    const recent_sales = props.recent_sales;
    const year_summary = props.year_summary;
    const customers_summary = props.customers_summary;

    const renderReportsList = recent_sales.map((report) => {
        return (
            <ReportListRow key={report.id} report={report}
            ></ReportListRow>
        );
    })
    // sales Bars chart
    //

    /**
     * Bar graph
     *
     * */
    const labels = new Array();
    const dataCustomers = new Array()
    let countCustomer = 0;
    customers_summary.map((summary) => {
        labels[countCustomer] = summary.month_name;
        dataCustomers[countCustomer] = summary.record_count;
    })

    // const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Customers ',
                data: dataCustomers,
                backgroundColor: 'rgba(99,115,255,0.5)',
            }
        ],
    };



    return (
        <div>
            <div class="container-fluid mt--6">
                <div class="row">
                    <div class="col-xl-8">
                        <div class="card bg-default">
                            <div class="card-header bg-transparent">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <h6 class="text-light text-uppercase ls-1 mb-1">Overview</h6>
                                        <h5 class="h3 text-white mb-0">Sales </h5>
                                    </div>
                                    <div class="col">
                                        <ul class="nav nav-pills justify-content-end">
                                            <li class="nav-item mr-2 mr-md-0" data-toggle="chart"
                                                data-target="#chart-sales-dark"
                                                data-update='{"data":{"datasets":[{"data":[0, 20, 10, 30, 15, 40, 20, 60, 60]}]}}'
                                                data-prefix="$" data-suffix="k">
                                                <a href="#" class="nav-link py-2 px-3 active disabled"
                                                   data-toggle="tab">
                                                    <span class="d-none d-md-block">Month</span>
                                                    <span class="d-md-none">M</span>
                                                </a>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="chart">
                                    {/*<canvas id="chart-sales-dark" class="chart-canvas"></canvas>*/}
                                    <GraphLinear year_summary={year_summary}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4">
                        <div class="card">
                            <div class="card-header bg-transparent">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <h6 class="text-uppercase text-muted ls-1 mb-1">Overview</h6>
                                        <h5 class="h3 mb-0">Total Customers</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                {/*Chart */}
                                <div class="chart">
                                    {/*<canvas id="chart-bars" class="chart-canvas"></canvas>*/}
                                    <Bar options={options} data={data}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-12">
                        <div class="card">
                            <div class="card-header border-0">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <h3 class="mb-0">Recent Sales</h3>
                                    </div>
                                    <div class="col text-right">
                                        <a href="#!" class="btn btn-sm btn-primary">See all</a>
                                        <a href="#!" class="btn btn-sm btn-secondary">Print</a>
                                    </div>
                                </div>
                            </div>
                            <div class="table-responsive">

                                <table className="table align-items-center table-flush table-hover mt-1" id="units_tbl">
                                    <thead className="thead-light">
                                    <tr>
                                        <th scope="col">Invoice #</th>
                                        <th scope="col">Customer Name</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Total</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="list">

                                    {renderReportsList}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Analytics;