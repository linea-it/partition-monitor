import { makeStyles } from '@material-ui/core/styles';


const drawerWidth = 240;

const styles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  appBar: {
    backgroundColor: '#fff',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
    color: '#000',
    width: `calc(100% - ${theme.spacing(7) + 1}px)`,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    color: '#fff',
  },
  hide: {
    display: 'none',
  },
  drawerList: {
    paddingTop: 0,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    background: '#454545',
    borderRight: 'none',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    background: '#454545',
    borderRight: 'none',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7),
  },
  drawerControlWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    backgroundColor: 'rgb(240, 241, 244)',
  },
  bodyWrapper: {
    height: '100%',
    width: '100%',
    marginTop: '64px',
  },
  bodyWrapperOpen: {
    maxWidth: `calc(100% - ${drawerWidth}px)`,
  },
  bodyWrapperClose: {
    maxWidth: `calc(100% - ${theme.spacing(7)}px)`,
  },
  homeBtn: {
    fontSize: 18,
    fontWeight: 'bold !important',
    textAlign: 'center',
    maxWidth: '100%',
    textTransform: 'uppercase',
    display: 'block',
  },
  btnGroup: {
    textAlign: 'right',
    width: '100%',
    color: '#fff',
  },
  invisibleLink: {
    color: 'black',
    textDecoration: 'none',
    display: 'none,',
  },
  textDrawer: {
    color: 'white',
    fontWeight: 500,
  },
  ListIconDrawer: {
    minWidth: 40,
    color: 'white',
  },
  ListIconDrawerOpen: {
    minWidth: 35,
  },
  ListIconControlDrawer: {
    backgroundColor: 'rgba(255,255,255,.2)',
    padding: 7,
  },
  iconDrawer: {
    width: 'auto',
    fontSize: '1.2rem',
  },
  expandClosed: {
    width: 'auto',
    fontSize: '1.7rem',
    marginLeft: '-4px',
  },
  borderDrawer: {
    backgroundColor: 'rgba(255, 255, 255, 0.32)',
  },
  iconHomeOpen: {
    maxWidth: 140,
    borderRadius: 140,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  iconHomeClose: {
    maxWidth: 42,
    marginLeft: -8,
    borderRadius: 42,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  logoBlock: {
    display: 'block',
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}
));

export default styles;
