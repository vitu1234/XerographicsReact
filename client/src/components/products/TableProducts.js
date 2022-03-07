import React from "react";
import {Link} from "react-router-dom";
import BaseUrl from '../../api/baseUrl';
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";


const TableProducts = (props) => {
    // console.log(props.user)
    const products = props.products;
    //table stuff
    const columns = [
        {id: 'product', label: 'Product Name', minWidth: 170},
        {id: 'branch', label: 'Branch', minWidth: 170},
        {id: 'category', label: 'Category', minWidth: 200},
        // {
        //     id: 'unit',
        //     label: 'Unit',
        //     minWidth: 10,
        // },
        {
            id: 'price',
            label: 'Price (MWK)',
            minWidth: 50,
        },
        {
            id: 'quantity',
            label: 'Qty',
            minWidth: 50,
        },
        {
            id: 'action',
            label: 'Action',
            minWidth: 60,
        },
    ];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    /*
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
     */

    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    <b>{column.label}
                                    </b> </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                let count = 0;
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1}
                                              key={row.id}>

                                        <TableCell>
                                            <TableHead>
                                                <div className="media align-items-center">
                                                    <a href="#" className="avatar rounded-circle mr-3">
                                                        <img height={'100%'} width={'100%'} alt="Image placeholder"
                                                             src={`${BaseUrl}/storage/product_images/${row.img_url}`}/>
                                                    </a>
                                                    <div className="media-body">
                                                        <span className="name mb-0 text-sm"> {row.product_name}</span>
                                                    </div>
                                                </div>
                                            </TableHead>
                                        </TableCell>

                                        <TableCell key={count}>
                                            {row.branch_name}
                                        </TableCell>
                                        <TableCell>
                                            {row.category_name}
                                        </TableCell>
                                        {/*<TableCell >*/}
                                        {/*    {row.unit_name} -*/}
                                        {/*    {row.unit_symbol}*/}
                                        {/*</TableCell>*/}
                                        <TableCell>
                                            {row.product_price}
                                        </TableCell>
                                        <TableCell>
                                            {row.product_qty}
                                        </TableCell>
                                        <TableCell>
                                            <div className="dropdown">
                                                <a className="btn btn-sm btn-icon-only text-dark" href="#" role="button"
                                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                    <i className="fas fa-ellipsis-h"></i>
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                                    <Link to={'editProduct/' + row.id}
                                                          state={{product: row}}
                                                          className="text-primary dropdown-item editIcon">Edit</Link>

                                                    <button onClick={() => props.getDeleteProductId(row.id)}
                                                            className="dropdown-item text-danger">Delete
                                                    </button>

                                                </div>
                                            </div>
                                        </TableCell>

                                    </TableRow>
                                );

                                count++
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default TableProducts;