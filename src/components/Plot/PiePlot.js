import React from 'react';
import PropTypes from 'prop-types';
import Plotly from 'react-plotly.js';

function PiePlot({ title, width, height, data }) {

  return (
    <Plotly
      data={data}
      layout= {{
        title: title,
        height: height,
        width: width,
        showlegend: false,
        margin: {
          l: 0,
          t: 0,
          pad: 0
        }
      }}
  />
  )
  
}

PiePlot.propTypes = {
    title: PropTypes.string,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    data: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired,
};

PiePlot.defaultProps = {
  width: 600,
  height: 300,
  title: ''
}

export default PiePlot;