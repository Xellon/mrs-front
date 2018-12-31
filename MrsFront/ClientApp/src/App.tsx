import * as React from "react";
import { Route } from "react-router";
import { CssBaseline } from "@material-ui/core";

import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import { Movies } from "./pages/movies/Movies";
import { Register } from "./pages/register/Register";
import { RequestMovie } from "./pages/requestmovie/RequestMovie";
import Welcome from "./pages/Welcome";
import { Authentication } from "./common/Authentication";
import { UserType } from "./model/Model";
import { Navigation } from "./components/navigation/Navigation";
import { AboutPage } from "./pages/about/About";
import { HeaderBar } from "./components/HeaderBar";
import { Receipts } from "./pages/receipts/Receipts";

import "./App.scss";

const SharedRoutes: React.ReactNode = (
  <>
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/about" component={AboutPage} />
  </>
);

const UserSharedRoutes: React.ReactNode = (
  <>
    <Route path="/receipts" component={Receipts} />
  </>
);

interface State {
  showNavigation: boolean;
}

export default class App extends React.Component<{}, State> {
  public readonly state: State = { showNavigation: false }

  private getRoutesForUser() {
    const user = Authentication.getSignedInUser();

    let routes = SharedRoutes;

    if (!user)
      return (<><Route exact path="/" component={Welcome} />{routes}</>);

    routes = (<><Route exact path="/" component={Main} />{UserSharedRoutes}{routes}</>);

    switch (user.userType) {
      case UserType.Client:
        routes = (
          <>
            <Route path="/requestmovie" component={RequestMovie} />
            {routes}
          </>);
        break;
      case UserType.Admin:
        routes = (
          <>
            <Route path="/movies" component={Movies} />
            {routes}
          </>);
        break;
      case UserType.Finance:
        break;
    }

    return routes;
  }

  private _onNavigationClick = () => {
    this.setState(prevState => ({ showNavigation: !prevState.showNavigation }));
  }

  public render() {
    return (
      <>
        <CssBaseline />
        <header>
          <HeaderBar onNavigationClick={this._onNavigationClick} />
        </header>
        <div className="content"
          style={{ gridTemplateColumns: this.state.showNavigation ? "200px auto" : "auto" }}
        >
          {/* Side menu */
            this.state.showNavigation ? <Navigation /> : undefined}

          {/* Main */
            this.getRoutesForUser()}
        </div>
      </>
    );
  }
}