import React, { useEffect } from 'react';
import PropTypes from 'prop-types'

function Duc({ setTitle }) {

  useEffect(() => {
    setTitle('Detailed Vision')
  }, [setTitle])

  return (
    <div>
      <iframe
        title="duc.cgi"
        src="https://devel6.linea.gov.br/"
        width="100%"
        height="950px"
        frameBorder="0"
      />
    </div>
  )
}

Duc.propTypes = {
  setTitle: PropTypes.func.isRequired,
}

export default Duc;