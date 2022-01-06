import React from "react";
import { Link } from "react-router-dom";

const BrandListRow = (props) => {
    // console.log(props.user)
    const brand = props.brand;


    return (
        <tr >

            <th>
                {brand.brand_name}
            </th>

            <td className="">
                <div className="dropdown">
                    <a className="btn btn-sm btn-icon-only text-dark" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-h"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                        <Link to={'products/product_brands/editProductBrand' + brand.id}
                            state={{ brand: brand }}
                            className="text-primary dropdown-item editIcon" >Edit</Link>

                        <button onClick={() => props.getDeleteBrandId(brand.id)} className="dropdown-item text-danger">Delete</button>

                    </div>
                </div>
            </td>
        </tr>
    );
}

export default BrandListRow;