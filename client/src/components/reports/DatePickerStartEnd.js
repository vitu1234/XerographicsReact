import {Link} from "react-router-dom";
import React, {useState} from 'react'
import {enUS, es} from 'date-fns/locale'
import {DatePicker} from 'react-nice-dates'
import 'react-nice-dates/build/style.css'

export function DatePickerStartEnd(props) {
    const [date, setDate] = useState()
    const date2 = new Date();
    // console.log(props)

    const handleChange = (date) => {
        setDate(date)
        if (props.setEndDate) {
            props.setEndDate(date)
        } else {
            props.setStartDate(date)
        }
    }


    return (
        <div>

            <DatePicker maximumDate={date2} date={date} onDateChange={handleChange} locale={enUS}>
                {({inputProps, focused}) => (


                    <input placeholder='Start date' type="date" placeholder={'From'}
                           className={'form-control input' + (focused ? ' -focused' : '')} {...inputProps}
                           required
                           onKeyPress={(event) => {
                               if (!/[0-9/]/.test(event.key)) {
                                   event.preventDefault();
                               }
                           }}
                    />
                )}
            </DatePicker>
        </div>
    )
}