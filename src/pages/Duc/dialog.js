import React from 'react';
// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Duc from '../Duc/';
import CloseModal from '../../components/CloseModal';

function DucDialog({ open, setOpen, partition }) {
  

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div >
      <Dialog
        maxWidth={'xl'}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`${partition.server}${partition.mountpoint}`}
          <CloseModal setOpen={setOpen} />
        </DialogTitle>
        <DialogContent>
          <Duc partition={partition}/>
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}

DucDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  partition: PropTypes.object.isRequired,
}

export default DucDialog;