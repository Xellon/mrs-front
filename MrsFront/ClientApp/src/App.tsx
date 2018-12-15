import * as React from "react";
import { Route, withRouter } from "react-router";
import { AppBar, Toolbar, Typography, CssBaseline, IconButton, Button } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import { MovieList } from "./pages/movielist/MovieList";
import { Register } from "./pages/register/Register";
import { RequestMovie } from "./pages/requestmovie/RequestMovie";
import Welcome from "./pages/Welcome";
import { Authentication } from "./common/Authentication";

import "./App.scss";
import { UserType } from "./model/Model";
import { Utils } from "./common/Utils";

const styles = {
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const MainPageButton = withRouter(({ history }) => (
  <Button
    color="inherit"
    style={styles.grow}
    onClick={Utils.createOnNavigationClick(history, "/")}
  >
    <Typography variant="h6" color="inherit">
      Movie Recommendation Service
    </Typography>
  </Button>
));

const LoginPageButton = withRouter(({ history }) => (
  <Button
    color="inherit"
    style={styles.menuButton}
    onClick={Utils.createOnNavigationClick(history, "/login")}
  >
    Login
  </Button>
));

const RegisterPageButton = withRouter(({ history }) => (
  <Button
    color="inherit"
    style={styles.menuButton}
    onClick={Utils.createOnNavigationClick(history, "/register")}
  >
    Register
  </Button>
));

interface State {
  userSignedIn: boolean;
}

export default class App extends React.Component<{}, State> {
  public readonly state: State = { userSignedIn: true }

  private getRoutesForUser() {
    const user = Authentication.getSignedInUser();

    let routes: React.ReactNode = (
      <>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {/* TODO: REMOVE */}
        <Route path="/movielist" component={MovieList} />
      </>
    );

    if (!user) {
      return (
        <>
          <Route exact path="/" component={Welcome} />
          {routes}
        </>);
    }

    routes = (
      <>
        <Route exact path="/" component={Main} />
        {routes}
      </>
    );

    switch (user.userType) {
      case UserType.Client:
        routes = (
          <>
            <Route path="/requestmovie" component={RequestMovie} />
            {routes}
          </>);
        break;
      case UserType.Admin:
      case UserType.Client:
        routes = (
          <>
            <Route path="/movielist" component={MovieList} />
            {routes}
          </>);
        break;
    }

    return routes;
  }

  private getNavigationButtonsForUser() {
    const user = Authentication.getSignedInUser();

    if (!user)
      return (
        <>
          <LoginPageButton />
          <RegisterPageButton />
        </>
      );

    return (
      <Button
        color="inherit"
        style={styles.menuButton}
        onClick={this.onSignOut}
      >
        Sign Out
      </Button>
    );
  }

  private onSignOut = () => {
    location.reload();
  }

  public render() {
    return (
      <>
        <CssBaseline />
        <header>
          <AppBar position="static">
            <Toolbar>
              <IconButton color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <MainPageButton />
              {this.getNavigationButtonsForUser()}
            </Toolbar>
          </AppBar>
        </header>
        {this.getRoutesForUser()}
      </>
    );
  }
}