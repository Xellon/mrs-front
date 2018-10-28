import * as React from "react";
import {Route, withRouter} from "react-router"
import { AppBar, Toolbar, Typography, CssBaseline, IconButton, Button } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

import "./App.scss";
import Main from "./pages/Main";
import Login from "./pages/Login";


const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const MainPageButton = withRouter(({history}) => (
  <Button 
    color="inherit" 
    style={styles.grow} 
    onClick={() => {
      history.push("/")
    }}
  >
    <Typography variant="h6" color="inherit">
      Movie Recommendation Service
    </Typography>
  </Button>
));

const LoginPageButton = withRouter(({history}) => (
  <Button 
    color="inherit" 
    style={styles.menuButton} 
    onClick={() => {
      history.push("/login")
    }}
  >
    Login
  </Button>
));

export default class App extends React.Component {
  public render(){
    return(
      <>
        <CssBaseline/>
        <header>
          <AppBar position="static">
            <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <MainPageButton/>
            <LoginPageButton/>
            </Toolbar>
          </AppBar>
        </header>
        <>
          <Route exact path='/' component={Main} />
          <Route path='/login' component={Login} />
        </>
      </>
    );
  }
}