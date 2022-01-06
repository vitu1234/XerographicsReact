import React from "react";
import { Link } from "react-router-dom";
import BaseUrl from '../../api/baseUrl';


const ProductListRow = (props) => {
    // console.log(props.user)
    const product = props.product;

    return (
        <tr >
            <th >
                <div className="media align-items-center">
                    <a href="#" className="avatar rounded-circle mr-3">
                        <img height={'100%'} width={'100%'} alt="Image placeholder" src={`${BaseUrl}/storage/product_images/${product.img_url}`} />
                    </a>
                    <div className="media-body">
                        <span className="name mb-0 text-sm"> {product.product_name}</span>
                    </div>
                </div>
            </th>

            <td>
                {product.branch_name}
            </td>

            <td>
                {product.category_name}
            </td>

            <td>
                {product.unit_name} -
                {product.unit_symbol}

            </td>

            <td>
                {product.product_price}
            </td>

            <td>
                {product.product_qty}
            </td>

            <td className="">
                <div className="dropdown">
                    <a className="btn btn-sm btn-icon-only text-dark" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-h"></i>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                        <Link to={'editProduct/' + product.id}
                            state={{ product: product }}
                            className="text-primary dropdown-item editIcon" >Edit</Link>

                        <button onClick={() => props.getDeleteProductId(product.id)} className="dropdown-item text-danger">Delete</button>

                    </div>
                </div>
            </td>
        </tr>
    );
}

export default ProductListRow;