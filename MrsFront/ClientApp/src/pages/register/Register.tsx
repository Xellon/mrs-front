import * as React from "react";
import { MainInfo, MainInfoForm } from "./MainInfo";
import { Button } from "@material-ui/core";
import CustomEvent from "../../common/CustomEvent";

export interface RegisterState {
  mainInfo?: MainInfoForm;
}

export class Register extends React.Component<{}, RegisterState> {
  public _submitEvent = new CustomEvent();

  private _retrieveMainInfo = (mainInfo: MainInfoForm) => {
    this.setState({mainInfo});
  }

  private _onClick = () => {
    this._submitEvent.notify(this, undefined);
  }

  public render() {
    return(
      <main>
        <h1>Register</h1>
        <h2>Main info</h2>
        <MainInfo 
          submitEvent={this._submitEvent} 
          onSubmit={this._retrieveMainInfo}
        />
        <Button 
          variant="contained" 
          color="primary"
          onClick={this._onClick}
        >
          Submit
        </Button>
      </main>
    );
  }
}
