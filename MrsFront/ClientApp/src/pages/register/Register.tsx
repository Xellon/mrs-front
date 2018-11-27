import * as React from "react";
import { MainInfo, MainInfoForm } from "./MainInfo";
import { Button, Paper, Typography } from "@material-ui/core";
import CustomEvent from "../../common/CustomEvent";
import Movies from "./Movies";

export interface RegisterState {
  mainInfo?: MainInfoForm;
}

export class Register extends React.Component<{}, RegisterState> {
  public _submitEvent = new CustomEvent();

  private _retrieveMainInfo = (mainInfo: MainInfoForm) => {
    this.setState({ mainInfo });
  }

  private _onClick = () => {
    this._submitEvent.notify(this, undefined);
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
        <Movies />
        <Button
          variant="contained"
          color="primary"
          onClick={this._onClick}
          style={{ margin: "15px auto", display: "block" }}
        >
          Submit
        </Button>
      </main>
    );
  }
}
