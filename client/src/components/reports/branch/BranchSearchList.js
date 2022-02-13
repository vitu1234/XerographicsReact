import {useState} from 'react';
import React from "react";

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


function BranchSearchList(props) {
    const branches = props.branches;

    const [branchId, setBranchId] = useState(-1);
    const [branchname, setBranchName] = useState('');


    //users auto complete
    const handleAutocomplete = (event, newValue) => {
        if (newValue != null) {
            console.log(newValue)
            setBranchId(newValue.id);
            props.setBranchId(newValue.id)
            setBranchName('Branch: ' + newValue.branch_name);
        }
    }


    return (


        <Autocomplete

            id="free-solo-demo"
            freeSolo
            options={branches}
            getOptionLabel={branches => (branches.branch_name )}
            onChange={handleAutocomplete}
            renderInput={params => (<TextField
                    {...params}
                    label="Branch sales..."
                    fullWidth/>
            )}
        />


    );
}

export default BranchSearchList;