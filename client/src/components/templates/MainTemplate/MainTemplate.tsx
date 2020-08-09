import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Sidebar from '../../nav/Sidebar';
import Topbar from '../../nav/Topbar';
import useStyles from './styles';

const MainTemplate: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Topbar />
      <Sidebar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default MainTemplate;
