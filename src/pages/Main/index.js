import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function Main({ setTitle }) {

  useEffect(() => {
    setTitle('Partition Monitor')
  }, [setTitle])

  return (
    <div>
    </div>
  )
}

Main.propTypes = {
  setTitle: PropTypes.func.isRequired
}

export default Main;