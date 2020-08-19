import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  spin: {
    left: '37%',
    marginTop: '11%',
    position: 'absolute',
    width: '40px',
    height: '40px',
    opacity: 1,
    transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 800ms',
    zIndex: 1000,
  },
}));

export default styles;
