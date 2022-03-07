import React from 'react';

function InvoiceDetailsListRow(props) {
    const invoice_details = props.invoiceItem;
    return (
        <tr>
            <td>{props.count}</td>
            <td>{invoice_details.product_name}</td>
            <td>{invoice_details.product_qty}</td>
            <td className="text-95">{invoice_details.product_price}</td>
            <td className="text-95"> {invoice_details.total_price}</td>

        </tr>
    );
}

export default InvoiceDetailsListRow;