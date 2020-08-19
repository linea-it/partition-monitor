import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  spin: {
    left: '50%',
    marginTop: '18%',
    position: 'absolute',
    width: '40px',
    height: '40px',
    opacity: 1,
    transition: 'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 800ms',
    zIindex: 5,
  },
  labelPieChart: {
    position: 'absolute',
    zIndex: 2,
    marginLeft: '280px',
    marginTop: '10px',
  },
}));

export default styles;
