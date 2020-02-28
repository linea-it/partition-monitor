import React, { useState } from 'react';
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

function Drawer() {
  const [open, setOpen] = useState(false);
  const classes = styles();
  const [title, setTitle] = useState('Verifier');

  const handleDrawerClick = () => setOpen(!open);

  return (
    <div className={classes.root}>
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
                  <ListItemIcon className={clsx(classes.ListIconDrawer, open ? classes.logoBlock : '')}>
                    <img src={logo} alt="TNO" className={clsx(open ? classes.iconHomeOpen : classes.iconHomeClose)} />
                  </ListItemIcon>
                  )}
                className={clsx(classes.homeBtn, classes.textDrawer)}
              />
            </ListItem>
          </Link>
          <Divider className={classes.borderDrawer} />
          <Link to="/dashboard" className={classes.invisibleLink} title="Grid">
            <ListItem button className={open ? classes.nested : ''}>
              <ListItemIcon className={clsx(classes.ListIconDrawer, open ? classes.ListIconDrawerOpen : '')}>
                <Icon className={clsx(classes.iconDrawer, 'fa', 'fa-th')} />
              </ListItemIcon>
              <ListItemText
                primary="Grid"
                className={classes.textDrawer}
              />
            </ListItem>
          </Link>
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
    </div>
  );
}

export default Drawer;
