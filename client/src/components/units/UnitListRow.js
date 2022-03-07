import React from "react";
import { Link } from "react-router-dom";

const UnitListRow = (props) => {
    // console.log(props.user)
    const unit = props.unit;


    return (
        <tr >
            <th >

                <span className="name mb-0 text-sm"> {unit.unit_name}</span>

            </th>

            <td>
                {unit.unit_symbol}
            </td>

            <td className="">
                <div className="dropdown">
                    <a className="btn btn-sm btn-icon-only text-dark" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-h"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                        <Link to={'editUnit/' + unit.id}
                            state={{ unit: unit }}
                            className="text-primary dropdown-item editIcon" >Edit</Link>

                        <button onClick={() => props.getDeleteUnitId(unit.id)} className="dropdown-item text-danger">Delete</button>

                    </div>
                </div>
            </td>
        </tr>
    );
}

export default UnitListRow;