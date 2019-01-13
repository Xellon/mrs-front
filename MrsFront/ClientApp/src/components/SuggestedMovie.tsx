import * as React from "react";
import { ListItemText, ListItemAvatar, Paper, ListItem } from "@material-ui/core";
import { Utils } from "../common/Utils";

interface Props {
  title: string;
  imageUrl?: string;
  possibleRating: number;
}

export default class SuggestedMovie extends React.PureComponent<Props> {
  public render() {
    return (
      <Paper style={{ margin: 5 }}>
        <ListItem>
          <ListItemAvatar >
            <img
              src={this.props.imageUrl
                ? this.props.imageUrl
                : Utils.DEFAULT_MOVIE_IMAGE_URL}
              height={100}
            />
          </ListItemAvatar>
          <ListItemText secondary={this.props.title}>
            Title
          </ListItemText>
          <ListItemText
            secondary={this.props.possibleRating}
            style={{ maxWidth: 150 }}
          >
            Possible Rating
          </ListItemText>
        </ListItem>
      </Paper>
    );
  }
}