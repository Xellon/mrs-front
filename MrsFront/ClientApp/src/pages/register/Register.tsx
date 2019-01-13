import * as React from "react";
import { MainInfo, MainInfoForm } from "./MainInfo";
import { Button, Paper, Typography, Snackbar, SnackbarContent } from "@material-ui/core";
import { CustomEvent } from "../../common/CustomEvent";
import Movies from "./Movies";
import { UserMovieForm } from "./UserMovie";
import { Utils } from "../../common/Utils";

export interface State {
  submitError?: string;
}

interface RegisterForm {
  mainInfo: MainInfoForm;
  movies: UserMovieForm[];
}

export class Register extends React.Component<{}, State> {
  public readonly state: State = {};
  private _submitEvent = new CustomEvent();

  private _form = this._defaultForm;

  private get _defaultForm(): RegisterForm {
    return {
      mainInfo: undefined,
      movies: new Array<UserMovieForm>(),
    };
  }

  private _retrieveMainInfo = (mainInfo: MainInfoForm) => {
    this._form.mainInfo = mainInfo;
  }

  private _retrieveMovieInfo = (movieForm: UserMovieForm) => {
    this._form.movies.push(movieForm);
  }

  private _onClick = async () => {
    // Reset form
    this._form = this._defaultForm;

    if (this._submitEvent.notify(this, undefined)) {
      const response = await Utils.fetchBackend(
        "/api/signup",
        {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...this._form.mainInfo,
            movies: this._form.movies,
          })
        });

      if (response.ok)
        return;

      const errorText = await response.text();
      this.setState({ submitError: errorText })
      return;
    }

    this.setState({ submitError: "Error in one of the fields!" });
  }

  public render() {
    return (
      <main style={{ width: 600, margin: "0 auto" }}>
        <Typography variant="headline" style={{ paddingBottom: 10 }} align="center">Register</Typography>
        <Paper style={{ padding: 10 }} >
          <Typography variant="h6">Main info</Typography>
          <MainInfo
            submitEvent={this._submitEvent}
            onSubmit={this._retrieveMainInfo}
          />
        </Paper>
        <Movies onSubmit={this._retrieveMovieInfo} submitEvent={this._submitEvent} />
        <Button
          variant="contained"
          color="primary"
          onClick={this._onClick}
          style={{ margin: "15px auto", display: "block" }}
        >
          Submit
        </Button>
        <Snackbar
          open={!!this.state.submitError}
          autoHideDuration={3000}
          message={this.state.submitError}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <SnackbarContent
            message={this.state.submitError}
            style={{ background: "red" }}
          />
        </Snackbar>
      </main>
    );
  }
}
