import * as React from "react";
import { MainInfo, MainInfoForm } from "./MainInfo";
import { Button, Paper, Typography, Snackbar, IconButton } from "@material-ui/core";
import CustomEvent from "../../common/CustomEvent";
import Movies from "./Movies";
import CloseIcon from "@material-ui/icons/Close";

export interface State {
  mainInfo?: MainInfoForm;
  submitError?: string;
}

export class Register extends React.Component<{}, State> {
  public readonly state: State = {};
  public _submitEvent = new CustomEvent();

  private _retrieveMainInfo = (mainInfo: MainInfoForm) => {
    this.setState({ mainInfo });
  }

  private _retrieveMovieInfo = () => {

  }

  private _onClick = () => {
    if(this._submitEvent.notify(this, undefined)) {
      // Post to database
      return;
    }
    this.setState({submitError: "Error in one of the fields!"});

  }

  public render() {
    return (
      <main style={{ maxWidth: 600, margin: "auto" }}>
        <Typography variant="headline" style={{ paddingBottom: 10 }} align="center">Register</Typography>
        <Paper style={{ padding: 10 }} >
          <Typography variant="title">Main info</Typography>
          <MainInfo
            submitEvent={this._submitEvent}
            onSubmit={this._retrieveMainInfo}
          />
        </Paper>
        <Movies onSubmit={this._retrieveMovieInfo} submitEvent={this._submitEvent}/>
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
          message={this.state.mainInfo}
        >
          <IconButton
            aria-label="Close"
            color="inherit"
          >
            <CloseIcon />
          </IconButton>
        </Snackbar>
      </main>
    );
  }
}
