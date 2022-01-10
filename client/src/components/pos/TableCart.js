import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';


const columns = [
    { id: 'item', label: 'Item' },
    {
        id: 'qty',
        label: 'Qty',
        align: 'right',
    },

    {
        id: 'action',
        label: 'Action',
        align: 'right',
    },
];


function TableCart(props) {


    // console.log(props)

    const cartItems = props.cartItems;
    // console.log(cartItems);



    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const formatNumber = (number) => {
        var nf = new Intl.NumberFormat();
        var result = nf.format(number); // "1,234,567,890"
        return result;
    }


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                >
                                    <strong>{column.label}</strong>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.product_id}>
                                        <TableCell >
                                            {row.product_name} <br /> <small><i>MWK {formatNumber(row.product_price)}</i></small>
                                        </TableCell>
                                        <TableCell align='right'>
                                            {row.qty}
                                        </TableCell>
                                        <TableCell align='right'>
                                            <Button onClick={() => props.getDeleteProductIdFromCart(row.product_id)} variant="outlined" startIcon={<DeleteIcon />} color="error">
                                                Del
                                            </Button>
                                        </TableCell>

                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={cartItems.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}


export default TableCart;
