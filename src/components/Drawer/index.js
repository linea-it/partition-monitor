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
  Collapse,
} from '@material-ui/core';
import {
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
} from '@material-ui/icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import styles from './styles';
import logo from '../../assets/img/linea.png';
import Footer from '../Footer';

function Drawer({ title, children }) {
  const [open, setOpen] = useState(true);
  const [drawerTree, setDrawerTree] = useState({
    database: false,
    fileserver: false,
  });

  const handleDrawerClick = () => setOpen(!open);

  const handleDrawerTreeClick = (element) => setDrawerTree({
    ...drawerTree,
    [element]: !drawerTree[element],
  });

  const classes = styles();


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
          <Link to="/" className={classes.invisibleLink} title="Laboratório Interinstitucional de e-Astronomia">
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
          <ListItem button onClick={() => handleDrawerTreeClick('fileserver')}>
            {open ? (
              <ListItemIcon className={clsx(classes.ListIconDrawer, open ? classes.ListIconDrawerOpen : '')}>
                <Icon className={clsx(classes.iconDrawer, 'fa', 'fa-archive')} />
              </ListItemIcon>
            ) : (
              <ListItemIcon className={clsx(classes.ListIconDrawer, open ? classes.ListIconDrawerOpen : '')}>
                {drawerTree.fileserver ? (
                  <ExpandLess className={classes.expandClosed} />
                ) : (
                  <Icon className={clsx(classes.iconDrawer, 'fa', 'fa-archive')} />
                )}
              </ListItemIcon>
            )}
            <ListItemText
              primary="Fileserver"
              title="Fileserver"
              className={classes.textDrawer}
            />
            {open ? (
              <ListItemIcon className={clsx(classes.ListIconDrawer, open ? classes.ListIconDrawerOpen : '')} title="Fileserver">
                {drawerTree.fileserver
                  ? <ExpandLess className={classes.iconDrawer} />
                  : <ExpandMore className={classes.iconDrawer} />}
              </ListItemIcon>
            ) : null}
          </ListItem>
          <Collapse in={drawerTree.fileserver} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/ms01" className={classes.invisibleLink} title="MS01">
                <ListItem button className={open ? classes.nested : ''}>
                  <ListItemIcon className={clsx(classes.ListIconDrawer, open ? classes.ListIconDrawerOpen : '')}>
                    <Icon className={clsx(classes.iconDrawer, 'fa', 'fa-archive')} />
                  </ListItemIcon>
                  <ListItemText
                    primary="MS01"
                    className={classes.textDrawer}
                  />
                </ListItem>
              </Link>
              <Link disabled='true' to="/ms02" className={classes.invisibleLinkDisable} title="MS02">
                <ListItem button className={open ? classes.nested : ''}>
                  <ListItemIcon className={clsx(classes.ListIconDrawer, open ? classes.ListIconDrawerOpen : '')}>
                    <Icon className={clsx(classes.iconDrawer, 'fa', 'fa-archive')} />
                  </ListItemIcon>
                  <ListItemText
                    primary="MS02"
                    className={classes.textDrawer}
                  />
                </ListItem>
              </Link>
              <Link to="/ms04" className={classes.invisibleLink} title="MS04">
                <ListItem button className={open ? classes.nested : ''}>
                  <ListItemIcon className={clsx(classes.ListIconDrawer, open ? classes.ListIconDrawerOpen : '')}>
                    <Icon className={clsx(classes.iconDrawer, 'fa', 'fa-archive')} />
                  </ListItemIcon>
                  <ListItemText
                    primary="MS04"
                    className={classes.textDrawer}
                  />
                </ListItem>
              </Link>
              {/* <Link to="/Ferocks" className={classes.invisibleLink} title="Ferocks">
                <ListItem button className={open ? classes.nested : ''}>
                  <ListItemIcon className={clsx(classes.ListIconDrawer, open ? classes.ListIconDrawerOpen : '')}>
                    <Icon className={clsx(classes.iconDrawer, 'fa', 'fa-archive')} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Ferocks"
                    className={classes.textDrawer}
                  />
                </ListItem>
              </Link> */}
              <Link to="/Lustre" className={classes.invisibleLink} title="Lustre">
                <ListItem button className={open ? classes.nested : ''}>
                  <ListItemIcon className={clsx(classes.ListIconDrawer, open ? classes.ListIconDrawerOpen : '')}>
                    <Icon className={clsx(classes.iconDrawer, 'fa', 'fa-archive')} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Lustre"
                    className={classes.textDrawer}
                  />
                </ListItem>
              </Link>
              <Link to="/ALTIX" className={classes.invisibleLink} title="ALTIX">
                <ListItem button className={open ? classes.nested : ''}>
                  <ListItemIcon className={clsx(classes.ListIconDrawer, open ? classes.ListIconDrawerOpen : '')}>
                    <Icon className={clsx(classes.iconDrawer, 'fa', 'fa-archive')} />
                  </ListItemIcon>
                  <ListItemText
                    primary="ALTIX"
                    className={classes.textDrawer}
                  />
                </ListItem>
              </Link>
              <Link to="/Apollo" className={classes.invisibleLink} title="Apollo">
                <ListItem button className={open ? classes.nested : ''}>
                  <ListItemIcon className={clsx(classes.ListIconDrawer, open ? classes.ListIconDrawerOpen : '')}>
                    <Icon className={clsx(classes.iconDrawer, 'fa', 'fa-archive')} />
                  </ListItemIcon>
                  <ListItemText
                    primary="Apollo"
                    className={classes.textDrawer}
                  />
                </ListItem>
              </Link>
            </List>
          </Collapse>
          <Divider className={classes.borderDrawer} />
          <ListItem button onClick={() => handleDrawerTreeClick('database')}>
            {open ? (
              <ListItemIcon className={clsx(classes.ListIconDrawer, open ? classes.ListIconDrawerOpen : '')}>
                <Icon className={clsx(classes.iconDrawer, 'fa', 'fa-database')} />
              </ListItemIcon>
            ) : (
              <ListItemIcon className={clsx(classes.ListIconDrawer, open ? classes.ListIconDrawerOpen : '')}>
                {drawerTree.database ? (
                  <ExpandLess className={classes.expandClosed} />
                ) : (
                  <Icon className={clsx(classes.iconDrawer, 'fa', 'fa-database')} />
                )}
              </ListItemIcon>
            )}
            <ListItemText
              primary="Database"
              title="Database"
              className={classes.textDrawer}
            />
            {open ? (
              <ListItemIcon className={clsx(classes.ListIconDrawer, open ? classes.ListIconDrawerOpen : '')} title="Database">
                {drawerTree.database
                  ? <ExpandLess className={classes.iconDrawer} />
                  : <ExpandMore className={classes.iconDrawer} />}
              </ListItemIcon>
            ) : null}
          </ListItem>
          <Collapse in={drawerTree.database} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/desdb4" className={classes.invisibleLink} title="DESDB4">
                <ListItem button className={open ? classes.nested : ''}>
                  <ListItemIcon className={clsx(classes.ListIconDrawer, open ? classes.ListIconDrawerOpen : '')}>
                    <Icon className={clsx(classes.iconDrawer, 'fa', 'fa-database')} />
                  </ListItemIcon>
                  <ListItemText
                    primary="DESDB4"
                    className={classes.textDrawer}
                  />
                </ListItem>
              </Link>
              <Link to="/desdb6" className={classes.invisibleLink} title="DESDB6">
                <ListItem button className={open ? classes.nested : ''}>
                  <ListItemIcon className={clsx(classes.ListIconDrawer, open ? classes.ListIconDrawerOpen : '')}>
                    <Icon className={clsx(classes.iconDrawer, 'fa', 'fa-database')} />
                  </ListItemIcon>
                  <ListItemText
                    primary="DESDB6"
                    className={classes.textDrawer}
                  />
                </ListItem>
              </Link>
            </List>
          </Collapse>
          {/* <Divider className={classes.borderDrawer} />
          <Link to="/detailed-version" className={classes.invisibleLink}>
            <ListItem button>
              <ListItemIcon className={classes.ListIconDrawer}>
                <Icon className={clsx(classes.iconDrawer, 'fa', 'fa-chart-pie')} />
              </ListItemIcon>
              <ListItemText
                primary="Detailed Vision"
                className={classes.textDrawer}
              />
            </ListItem>
          </Link> */}
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
      <main
        id="main"
        className={clsx(
          classes.childrenContainer,
          open ? classes.appBarDrawerOpen : classes.appBarDrawerClose,
        )}
      >
        {children}
      </main>
      <Footer open={open} />
    </div>
  );
}

Drawer.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

export default Drawer;
