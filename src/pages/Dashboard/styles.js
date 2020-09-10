import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  circularProgress: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
    zIndex: 1,
  },
  labelPieChart: {
    position: 'absolute',
    zIndex: 2,
    marginLeft: '280px',
    marginTop: '10px',
    fontSize: '14px',
  },
}));

export default styles;
