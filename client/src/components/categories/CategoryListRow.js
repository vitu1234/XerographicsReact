import React from "react";
import { Link } from "react-router-dom";

const CategoryListRow = (props) => {
    // console.log(props.user)
    const category = props.category;
    const notes = () => {
        if (category.category_notes === null) {
            return (
                <td>-</td>
            )
        } else {
            return (
                <td>{category.category_notes}</td>
            )
        }
    }

    return (
        <tr >

            <th>
                {category.category_name}
            </th>


            {notes()}


            <td className="">
                <div className="dropdown">
                    <a className="btn btn-sm btn-icon-only text-dark" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-h"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                        <Link to={'editCategory/' + category.id}
                            state={{ category: category }}
                            className="text-primary dropdown-item editIcon" >Edit</Link>

                        <button onClick={() => props.getDeleteCategoryId(category.id)} className="dropdown-item text-danger">Delete</button>

                    </div>
                </div>
            </td>
        </tr>
    );
}

export default CategoryListRow;