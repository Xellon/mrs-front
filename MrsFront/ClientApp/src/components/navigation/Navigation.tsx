import * as React from "react";
import { Typography, Button } from "@material-ui/core";
import { Authentication } from "../../common/Authentication";

export class Navigation extends React.Component {

  public render() {
    return (
      <nav className="left-nav">
        <Typography>
          {Authentication.getSignedInUser()
            ? Authentication.getSignedInUser().email
            : undefined}
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          style={{ marginTop: 20 }}
        >
          Change movies
        </Button>
        <Button
          variant="contained"
          color="inherit"
          style={{ marginTop: 20 }}
        >
          Recommendations
        </Button>
      </nav>
    );
  }
}