import * as React from "react";
import { Paper } from "@material-ui/core";
import "./Main.scss";

export default class Welcome extends React.Component {

  public render() {
    return (
      <main>
        <Paper style={{ padding: "5px" }}>
          <h1>Welcome to Movie Recommendation service</h1>
          <p>
            Hello world!
          </p>
        </Paper>
      </main>
    );
  }
}