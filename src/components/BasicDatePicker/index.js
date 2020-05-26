import React from 'react';
import moment from 'moment';
import {Helmet} from 'react-helmet';
import PropTypes from 'prop-types';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import styles from './styles'; 

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';

function BasicDatePicker({ dateRange, setDateRange, setPeriod }) { 
  const classes = styles();
  const showFromMonth = () => {
    const { from, to } = dateRange;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), 'months') < 2) {
      to.getDayPicker().showMonth(from);
    }
  }

  const handleFromChange = (from) => {
    // Change the from date and focus the "to" input field
    setDateRange({...dateRange, from });
  }

  const handleToChange = (to) =>{
    setDateRange({...dateRange, to }, showFromMonth);
    setPeriod( (Math.random() * (9999 - 1) + 1) - 20000 );
  }

  let { from, to } = dateRange;
  const modifiers = { start: from, end: to };
    return (
      <div className="InputFromTo">
        <div className="MuiFormControl-root MuiTextField-root">
        <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled" data-shrink="true">From</label>
          <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
            <DayPickerInput
              value={from}
              placeholder="From"
              format="DD/MM/YYYY"
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                selectedDays: [from, { from, to }],
                disabledDays: { after: to },
                toMonth: to,
                modifiers,
                numberOfMonths: 2,
                onDayClick: () => to.getInput().focus(),
              }}
              onDayChange={handleFromChange}
            />
          </div>
        </div>
        <SwapHorizIcon className={classes.margin} />
        <div className="MuiFormControl-root MuiTextField-root">
        <label className="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-formControl MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled" data-shrink="true">To</label>
          <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl">
            <DayPickerInput
              ref={el => (to = el)}
              value={to}
              placeholder="To"
              format="DD/MM/YYYY"
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                selectedDays: [from, { from, to }],
                disabledDays: { before: from },
                modifiers,
                month: from,
                fromMonth: from,
                numberOfMonths: 2,
              }}
              onDayChange={handleToChange}
            />
          </div>
        </div>
        {/* </span> */}
      <Helmet>
        <style>{`
          .InputFromTo .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
            background-color: #f0f8ff !important;
            color: #4a90e2;
          }
          .InputFromTo .DayPicker-Day {
            border-radius: 0 !important;
          }
          .InputFromTo .DayPicker-Day--start {
            border-top-left-radius: 50% !important;
            border-bottom-left-radius: 50% !important;
          }
          .InputFromTo .DayPicker-Day--end {
            border-top-right-radius: 50% !important;
            border-bottom-right-radius: 50% !important;
          }
          .InputFromTo .DayPickerInput-Overlay {
            width: 600px;
            z-index: 5;
          }
          .InputFromTo-to .DayPickerInput-Overlay {
            width: 600px;
            margin-left: -198px;
            z-index: 5;
          }
          input {
            font: inherit;
            color: currentColor;
            width: 100%;
            border: 0;
            height: 1.1875em;
            margin: 0;
            display: block;
            padding: 6px 0 7px;
            min-width: 0;
            background: none;
            box-sizing: content-box;
          }
          input:focus {
            outline: -webkit-focus-ring-color auto 0px;
          }
          .MuiFormControl-root {
            z-index: 200;
          }
        }
        `}</style>
      </Helmet>
    </div>
  );
}

BasicDatePicker.propTypes = {
  dateRange: PropTypes.object.isRequired,
  setDateRange: PropTypes.func.isRequired,
  setPeriod: PropTypes.func.isRequired,
}

export default BasicDatePicker;