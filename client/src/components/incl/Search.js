import {useState, useRef, useEffect} from 'react';
import React from "react";

import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import QrCodeScannerTwoToneIcon from '@mui/icons-material/QrCodeScannerTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';

import Paper from '@mui/material/Paper';


function Search(props) {

    const [searchTerm, setSearchTerm] = useState("");
    const InputE = useRef('')

    const handleSearchKey = (e) => {
        e.preventDefault()
        props.getSearchValue(e.target.value)
        setSearchTerm(e.target.value)
    }


    useEffect(() => {
        InputE.current.focus()
    }, [])
    // InputE.current.focus()


    return (

        <Paper
            component="form"
            sx={{p: '2px 4px', mt: '20px', mb: '20px', display: 'flex', alignItems: 'center', width: '100%'}}
        >
            <IconButton sx={{p: '10px'}} aria-label="menu">
                <SearchIcon/>
            </IconButton>

            <InputBase
                ref={InputE}
                value={searchTerm} onChange={handleSearchKey}
                required={true}
                sx={{ml: 1, flex: 1}}
                placeholder="Search for an item"
                inputProps={{'aria-label': 'Search or scan a barcode'}}
            />
            <Divider disabled sx={{height: 28, m: 0.5}} orientation="vertical"/>

            <IconButton color="primary" sx={{p: '10px'}} aria-label="directions">
                <QrCodeScannerTwoToneIcon/>
            </IconButton>
        </Paper>

    );
}

export default Search;