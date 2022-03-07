import {useState} from 'react';
import React from "react";

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


function UserSearchList(props) {
    const users_prop = props.users;
    const user_type = sessionStorage.getItem('app_type')
    const app_user_branch = sessionStorage.getItem('branch')

    let users;
    if (user_type == '101') {
        users = users_prop

    } else {
        users = users_prop.filter((user) => {
            return user.branch_id == parseInt(app_user_branch)
        })
    }

    const [userId, setUserId] = useState(-1);
    const [fullname, setFullname] = useState('');


    //users auto complete
    const handleAutocomplete = (event, newValue) => {
        if (newValue != null) {
            console.log(newValue)
            setUserId(newValue.id);
            props.setSearchUserId(newValue.id)
            setFullname('User: ' + newValue.firstname + newValue.lastname);
        }
    }


    return (


        <Autocomplete

            id="free-solo-demo"
            freeSolo
            options={users}
            getOptionLabel={users => (users.firstname + ' ' + users.lastname)}
            onChange={handleAutocomplete}
            renderInput={params => (<TextField
                    {...params}
                    label="Sales person..."
                    fullWidth/>
            )}
        />


    );
}

export default UserSearchList;