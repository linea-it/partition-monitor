import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Typography, Toolbar } from '@material-ui/core';
import logo from '../../assets/img/linea-logo-mini.png';
import gitVersion from '../../assets/json/version.json';
import styles from './styles'

function Footer() {
  const classes = styles();

  const openGithub = (vlink) => {
    if (vlink) {
      window.open(vlink);
    }
  };

  const instance = process.env.NODE_ENV === 'production'
    ? window._env_.REACT_APP_INSTANCE // eslint-disable-line
    : process.env.REACT_APP_INSTANCE;

  let version = '--';
  let vlink = null;

  if (
    Object.entries(gitVersion).length !== 0
    && gitVersion.constructor === Object
  ) {
    if (gitVersion.tag) {
      version = `${gitVersion.tag}`;
      vlink = `${gitVersion.url}`;
    } else {
      version = `${gitVersion.sha.substring(0, 7)}`;
      vlink = `${gitVersion.url.replace(/.git$/, '')}/commit/${gitVersion.sha}`;
    }
  }

  return (
    <footer className={classes.root}>
      <AppBar position="fixed" className={classes.drawer}>
        <Toolbar className={classes.toolbar}>
          <Typography color="inherit" className={classes.grow}>
            {instance}
            {' '}
            Partition Monitor:
            {' '}
            {/* eslint-disable-next-line */}
            <span
              onClick={() => openGithub(vlink)}
              className={classes.versionLink}
            >
              {version}
            </span>
          </Typography>
          <Typography color="inherit">Powered by</Typography>
          <a href="http://www.linea.gov.br/" target="blank" className={classes.logoLink}>
            <img
              src={logo}
              title="LIneA"
              alt="LineA"
              style={{ cursor: 'pointer', marginLeft: '10px' }}
            />
          </a>
        </Toolbar>
      </AppBar>
    </footer>
  );
}

export default Footer;
