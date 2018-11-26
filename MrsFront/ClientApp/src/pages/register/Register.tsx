import * as React from "react";
import { MainInfo } from "./MainInfo";
import { Button } from "@material-ui/core";

export class Register extends React.Component {
  public render() {
    return(
      <main>
        <h1>Register</h1>
        <h2>Main info</h2>
        <MainInfo />
        <Button 
          variant="contained" 
          color="primary"
        >
          Submit
        </Button>
      </main>
    );
  }
}