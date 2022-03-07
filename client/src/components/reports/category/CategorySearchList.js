import {useState} from 'react';
import React from "react";

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


function CategorySearchList(props) {
    const categories= props.categories;

    const [categoryId, setCategoryId] = useState(-1);
    const [categoryname, setCategoryName] = useState('');


    //users auto complete
    const handleAutocomplete = (event, newValue) => {
        if (newValue != null) {
            console.log(newValue)
            setCategoryId(newValue.id);
            props.setCategoryId(newValue.id)
            setCategoryName('Category: ' + newValue.category_name);
        }
    }


    return (


        <Autocomplete

            id="free-solo-demo"
            freeSolo
            options={categories}
            getOptionLabel={categories => (categories.category_name )}
            onChange={handleAutocomplete}
            renderInput={params => (<TextField
                    {...params}
                    label="Category sales..."
                    fullWidth/>
            )}
        />


    );
}

export default CategorySearchList;