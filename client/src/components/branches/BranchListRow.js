import React from "react";
import { Link } from "react-router-dom";

const BranchListRow = (props) => {
    // console.log(props.user)
    const branch = props.branch;
    const address = () => {
        if (branch.address === null) {
            return (
                <td>-</td>
            )
        } else {
            return (
                <td>{branch.address}</td>
            )
        }
    }

    return (
        <tr >

            <th>
                {branch.branch_name}
            </th>
            <th>
                {branch.phone}
            </th>
            <th>
                {branch.email}
            </th>


            {address()}


            <td className="">
                <div className="dropdown">
                    <a className="btn btn-sm btn-icon-only text-dark" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-h"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                        <Link to={'editBranch/' + branch.id}
                            state={{ branch: branch }}
                            className="text-primary dropdown-item editIcon" >Edit</Link>

                        <button onClick={() => props.getDeleteBranchId(branch.id)} className="dropdown-item text-danger">Delete</button>

                    </div>
                </div>
            </td>
        </tr>
    );
}

export default BranchListRow;