import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';
import faker from 'faker';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export const options = {
    elements: {
        line: {
            tension: 0.4 // disables bezier curves
        }
    },
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false,
    },
    stacked: false,
    plugins: {
        title: {
            display: false,
            text: 'Sales Over',
        },
    },
    scales: {
        y: {
            type: 'linear',
            display: false,
            position: 'left',
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'left',
            grid: {
                drawOnChartArea: true,
            },
        },
    },
};


const GraphLinear = (props) => {
    const customers_summary = props.year_summary;

    // console.log(customers_summary);
    /**
     * LINEAR GRAPH
     * */

    /**
     * Bar graph
     *
     * */
    const labels = new Array();
    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const dataCustomers = new Array()
    let countCustomer = 0;
    customers_summary.map((summary) => {
        labels[countCustomer] = summary.month_name;
        dataCustomers[countCustomer] = summary.record_count;
        countCustomer++;
    })


    // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels,
        datasets: [

            {
                label: 'Sales Overview',
                data: dataCustomers,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                yAxisID: 'y1',
            },
        ],
    };


    return <Line options={options} data={data}/>;


};

export default GraphLinear;