import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function Duc({ partition }) { 
  return (
    <div>
      <iframe
        title="duc.cgi"
        src={`https://devel6.linea.gov.br/cgi-bin/${partition.server}/duc.cgi?cmd=index&path=${partition.mountpoint === '/home' ? '/mnt/devhome' : partition.mountpoint}`}
        width="100%"
        height="950px"
        frameBorder="0"
      />
    </div>
  )
}

Duc.propTypes = {
  partition: PropTypes.object.isRequired,
}

export default Duc;