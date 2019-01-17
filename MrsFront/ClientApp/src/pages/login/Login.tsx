import * as React from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Authentication } from "../../common/Authentication";
import { Snackbar, SnackbarContent } from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";

import "./Login.scss";

interface State {
  email: string;
  password: string;
  error?: string;
}

export default class Login extends React.Component<RouteComponentProps, State> {
  public readonly state: State = {
    email: "",
    password: "",
  };

  public _onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = await Authentication.signIn(this.state.email, this.state.password);

    if (!user) {
      this.setState({ error: "Wrong email or password", password: "" });
      return;
    }
    this.props.history.push("/");
  }

  public _onEmailChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: e.target.value, error: undefined });
  }

  public _onPasswordChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: e.target.value, error: undefined });
  }

  public render() {
    return (
      <main>
        <Paper className="paper">
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className="custom-form" onSubmit={this._onSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">
                Email Address
              </InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                value={this.state.email}
                onChange={this._onEmailChanged}
                error={!!this.state.error}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">
                Password
              </InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={this.state.password}
                onChange={this._onPasswordChanged}
                error={!!this.state.error}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="buton-submit"
            >
              Login
            </Button>
          </form>
        </Paper>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={!!this.state.error}
          autoHideDuration={2000}
        >
          <SnackbarContent
            message={this.state.error}
            style={{ background: "red" }}
          />
        </Snackbar>
      </main>
    );
  }
}