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
import TextField from '@mui/material/TextField';


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

    console.log(props)

    const cartItems = props.cartItems;
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

    const pages = () => {
        if (cartItems.length >= 10) {
            return (
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component="div"
                    count={cartItems.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            )
        }
    }

    const handleQtyInput = (e, id) => {
        // console.log(e.target.value)
        // console.log(id)
        props.handleClickAddCart(id, e.target.value)
        // props.getSearchValue(e.target.value)
    }


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 400, height: 400 }}>
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

                                            {/* {row.qty} () => props.handleClickAddCart(row.product_id) */}
                                            <TextField
                                                onChange={(e) => handleQtyInput(e, row.product_id)}
                                                sx={{ width: '50%', alignItems: 'center', textAlign: 'center' }}
                                                InputProps={{ inputProps: { min: 1, max: row.stock_qty } }}
                                                defaultValue={row.qty}
                                                id="outlined-number"
                                                type="number"
                                                variant='standard'
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />

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
            {pages()}
        </Paper>
    );
}


export default TableCart;
