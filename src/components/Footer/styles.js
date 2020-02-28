import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  root: {
    width: '100%',
    float: 'right',
    height: 64,
  },
  drawer: {
    top: 'auto',
    bottom: 0,
    backgroundColor: theme.palette.main,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  versionLink: {
    color: '#d2cf00',
    textDecoration: 'none',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  logoLink: {
    lineHeight: 0,
  },
}));

export default styles;
