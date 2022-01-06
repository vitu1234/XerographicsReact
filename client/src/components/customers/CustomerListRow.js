import React from "react";
import { Link } from "react-router-dom";

const customerListRow = (props) => {
    // console.log(props.user)
    const customer = props.customer;
    const address = () => {
        if (customer.address === null) {
            return (
                <td>
                    -
                </td>
            )
        } else {
            return (
                <td>
                    {customer.address}
                </td>
            )
        }
    }

    return (
        <tr >
            <th >
                <div className="media align-items-center">
                    <a href="#" className="avatar rounded-circle mr-3">
                        <img alt="Image placeholder" src="../assets/img/theme/bootstrap.jpg" />
                    </a>
                    <div className="media-body">
                        <span className="name mb-0 text-sm"> {customer.customer_name}</span>
                    </div>
                </div>
            </th>

            <td>
                {customer.customer_phone}
            </td>

            {address()}


            <td className="">
                <div className="dropdown">
                    <a className="btn btn-sm btn-icon-only text-dark" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-h"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                        <Link to={'editCustomer/' + customer.id}
                            state={{ customer: customer }}
                            className="text-primary dropdown-item editIcon" >Edit</Link>

                        <button onClick={() => props.getDeleteCustomerId(customer.id)} className="dropdown-item text-danger">Delete</button>

                    </div>
                </div>
            </td>
        </tr>
    );
}

export default customerListRow;