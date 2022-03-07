import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Stack } from "@mui/material";
import React from 'react';
import { useEffect, useState } from 'react';


function Alert(props) {
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    // console.log(props)


    return (

        <Stack spacing={2} sx={{ width: '100%' }}>

            <Snackbar open={props.openAlert} autoHideDuration={6000} onClose={props.handleAlertClose}>
                <Alert onClose={props.handleAlertClose} severity={props.alertType} sx={{ width: '100%' }}>
                    {props.alertMessage}
                </Alert>
            </Snackbar>
        </Stack>
    );
}

export default Alert;