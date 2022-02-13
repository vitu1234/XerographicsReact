import React from "react";
import {Link} from "react-router-dom";

function ReportListRow(props) {
    const report = props.report;
    return (
        <tr>
            <td>
                # {report.id}
            </td>
            <td>
                {report.customer_name}
            </td>

            <td>
                {report.created_at}
            </td>
            <td>
                MWK {report.total_before_disc_tax}
            </td>
            <td className="">
                <div className="dropdown">
                    <a className="btn btn-sm btn-icon-only text-dark" href="#" role="button" data-toggle="dropdown"
                       aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-h"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                        <Link to={'/reports/user/view_invoice/' + report.id}
                              state={{report: report}}
                              className="text-primary dropdown-item editIcon">View</Link>

                    </div>
                </div>
            </td>
        </tr>


    );
}

export default ReportListRow;