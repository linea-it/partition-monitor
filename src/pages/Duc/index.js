import React from 'react';
import PropTypes from 'prop-types';

function Duc({ partition }) { 
  return (
    <div>
      <iframe
        title="duc.cgi"
        src={`https://devel6.linea.gov.br/cgi-bin/${partition}/duc.cgi?cmd=index&path=/archive`}
        width="100%"
        height="950px"
        frameBorder="0"
      />
    </div>
  )
}

Duc.propTypes = {
  partition: PropTypes.string.isRequired,
}

export default Duc;