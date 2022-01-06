import React from "react";
import { Link } from "react-router-dom";

const UserListRow = (props) => {
    // console.log(props.user)
    const user = props.user;

    const userStatus = () => {
        if (user.status === 'Active') {
            return (
                <i className="text-success"> {user.status}</i>
            )
        } else {
            return (
                <i className="text-danger"> {user.status}</i>
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
                        <span className="name mb-0 text-sm"> {user.firstname} {user.lastname}</span>
                    </div>
                </div>
            </th>

            <td>
                {user.email}
            </td>

            <td>
                {user.role}
            </td>

            <td>
                {userStatus()}

            </td>

            <td className="">
                <div className="dropdown">
                    <a className="btn btn-sm btn-icon-only text-dark" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-h"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                        <Link to={'editUser/' + user.id}
                            state={{ user: user }}
                            className="text-primary dropdown-item editIcon" >Edit</Link>

                        <button onClick={() => props.getDeleteUserId(user.id)} className="dropdown-item text-danger">Delete</button>

                    </div>
                </div>
            </td>
        </tr>
    );
}

export default UserListRow;