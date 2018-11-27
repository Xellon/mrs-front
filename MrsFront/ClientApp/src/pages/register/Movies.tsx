import * as React from "react";
import { List, Paper, Typography } from "@material-ui/core";
import AddMovieButton from "../../components/AddMovieButton";

export default class Movies extends React.Component {
  public render() {
    return (
      <Paper style={{ margin: "5px 0", padding: 10 }}>
        <Typography variant="title">Movies</Typography>
        <List>
          <AddMovieButton />
        </List>
      </Paper>
    );
  }
}