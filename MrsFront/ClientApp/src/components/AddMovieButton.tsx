import * as React from "react";
import { Button, Avatar, Typography, Paper, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

export default class AddMovieButton extends React.Component {
  public render() {
    return (
      <ListItem button>
        <ListItemText>
          <Typography variant="subtitle1">
            Add new movie
            </Typography>
        </ListItemText>
        <ListItemAvatar>
          <Avatar>
            <AddIcon />
          </Avatar>
        </ListItemAvatar>
      </ListItem>
    );
  }
}