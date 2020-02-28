import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Drawer as MuiDrawer,
  AppBar,
  Typography,
  List,
  CssBaseline,
  Divider,
  Icon,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@material-ui/core';
import {
  ChevronLeft,
  ChevronRight,
} from '@material-ui/icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import styles from './styles';
import logo from '../../assets/img/linea.png';
import Footer from '../Footer';

function Drawer({ children }) {
  const [open, setOpen] = useState(false);
  const [title] = useState('Partition Monitor');

  const handleDrawerClick = () => setOpen(!open);
  const classes = styles({ open });

  return (
    <div>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <Typography variant="h6" component="h1">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <MuiDrawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
        open={open}
      >
        <List className={classes.drawerList}>
          <Link to="/dashboard" className={classes.invisibleLink} title="Laboratório Interinstitucional de e-Astronomia">
            <ListItem button>
              <ListItemText
                primary={(
                  <>
                    <ListItemIcon className={clsx(classes.ListIconDrawer, open ? classes.logoBlock : '')}>
                      <img src={logo} alt="Monitor" className={clsx(open ? classes.iconHomeOpen : classes.iconHomeClose)} />
                    </ListItemIcon>
                    <span className={clsx(classes.homeDrawer, open ? classes.titleBlock : '')}>
                      Partition Monitor
                    </span>
                  </>
                  )}
                className={clsx(classes.homeBtn, classes.textDrawer)}
              />
            </ListItem>
          </Link>
          <Divider className={classes.borderDrawer} />
          <Link to="/history" className={classes.invisibleLink} title="History">
            <ListItem button>
              <ListItemIcon className={clsx(classes.ListIconDrawer, open ? classes.ListIconDrawerOpen : '')}>
                <Icon className={clsx(classes.iconDrawer, 'fa', 'fa-history')} />
              </ListItemIcon>
              <ListItemText
                primary="History"
                className={classes.textDrawer}
              />
            </ListItem>
          </Link>
          <Divider className={classes.borderDrawer} />
          <Link to="/servers" className={classes.invisibleLink} title="Servers">
            <ListItem button>
              <ListItemIcon className={clsx(classes.ListIconDrawer, open ? classes.ListIconDrawerOpen : '')}>
                <Icon className={clsx(classes.iconDrawer, 'fa', 'fa-server')} />
              </ListItemIcon>
              <ListItemText
                primary="Servers"
                className={classes.textDrawer}
              />
            </ListItem>
          </Link>
          <Divider className={classes.borderDrawer} />
        </List>
        <div className={classes.drawerControlWrapper}>
          <IconButton
            onClick={handleDrawerClick}
            className={clsx(classes.ListIconDrawer, classes.ListIconControlDrawer)}
            title={open ? 'Close' : 'Open'}
          >
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </div>
      </MuiDrawer>
      <main className={clsx(classes.childrenContainer, open ? classes.appBarDrawerOpen : classes.appBarDrawerClose)}>
        {children}
      </main>
      <Footer open={open} />
    </div>
  );
}

Drawer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

export default Drawer;
