import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import React from 'react';
function Dialogs(props) {
    return (

        <Dialog
            open={props.dialogOpen}
            onClose={props.handleClosehandleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {props.dialogTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.dialogMessage}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleDialogClose}>Close</Button>
                <Button className="text-danger" onClick={props.dialogAction} >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default Dialogs;