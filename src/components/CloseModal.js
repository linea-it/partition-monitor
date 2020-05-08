/* eslint-disable no-console */
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
  btnIco: {
    float: 'right',
    width: 'min-content',
  },
};

function CloseModal({ setOpen })  {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <IconButton
      style={styles.btnIco}
      edge="start"
      color="inherit"
      onClick={() => {
        handleClose();
      }}
      aria-label="close"
    >
      <CloseIcon />
    </IconButton>
  );
}

CloseModal.propTypes = {
  setOpen: PropTypes.func.isRequired,
}
export default withStyles(styles)(CloseModal);
