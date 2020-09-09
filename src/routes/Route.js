import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Drawer from '../components/Drawer';

export default function RouteWrapper({
  component: Component,
  ...rest
}) {
  const [title, setTitle] = useState('Storage Monitor');

  return (
    <Route
      {...rest}
      render={(props) => (
        <Drawer title={title}>
          <Component {...props} setTitle={setTitle} />
        </Drawer>
      )}
    />
  );
}


RouteWrapper.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};
