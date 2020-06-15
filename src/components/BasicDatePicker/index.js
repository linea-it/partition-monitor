import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { SampleBase } from './sample-base';

function BasicDatePicker({ dateRange, setDateRange, setPeriod }) {  
  
  const handleChange = () =>{
    console.log(dateRange);
    setDateRange(dateRange);
    setPeriod( (Math.random() * (9999 - 1) + 1) - 20000 );
  }
  return (
    <>
     <DateRangePickerComponent placeholder='Select a range' startDate={dateRange.start} endDate={dateRange.end} onChange={handleChange}/>
    </>
  );
}

BasicDatePicker.propTypes = {
  dateRange: PropTypes.object.isRequired,
  setDateRange: PropTypes.func.isRequired,
  setPeriod: PropTypes.func.isRequired,
}

export default BasicDatePicker;