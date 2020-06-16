import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#5c6b7d',
      main: '#34465d',
      dark: '#243141',
      contrastText: '#fff',
    },
    secondary: blue,
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    Pagination: {
      activeButton: {
        color: blue[500],
      },
    },
    MuiCardHeader: {
      root: {
        backgroundColor: 'rgb(248, 249, 252)',
        borderBottom: '1px solid rgb(227, 230, 240)',
        paddingTop: 5,
        paddingBottom: 5,
      },
      avatar: {
        color: '#34465d',
      },
      title: {
        color: '#34465d',
        fontSize: 16,
        fontWeight: 'bold',
      },
    },
    MuiTableRow: {
      root: {
        '&:hover': {
          backgroundColor: 'rgba(244, 244, 244, 1)',
        },
      },
    },
    MuiIcon: {
      root: {
        fontSize: '1rem',
      },
    },
    MuiCard: {
      root: {
        position: 'relative',
      },
    },
    MuiCardContent: {
      root: {
        position: 'relative',
      },
    },
    MuiDialog:{
      paper: {
        width: '70%',
      },
    },
  },
});

export default theme;
