import * as React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import { Paper, ListItemText, IconButton, Divider } from "@material-ui/core";
import { Movie } from "../../model/Model";
import { Utils } from "../../common/Utils";

interface State {
  movies?: Movie[];
}

export class Movies extends React.Component<{}, State> {
  public readonly state: State = {};

  public async componentDidMount() {
    const response = await Utils.fetchBackend("/api/data/movies");

    if (!response.ok)
      return;

    const movies = await response.json() as Movie[];
    this.setState({ movies });
  }

  private createListItems(state: State) {
    const list: React.ReactNode[] = [];

    if (!state.movies)
      return undefined;

    for (let i = 0; i < state.movies.length; i++) {
      list.push(
        <>
          <ListItem key={`item_${state.movies[i].id}`}>
            <ListItemText secondary={state.movies[i].title}>
              Title
            </ListItemText>
            <ListItemText secondary={state.movies[i].averageRating}>
              Rating
            </ListItemText>
            <Avatar src={state.movies[i].imageUrl} />
            <IconButton style={{ marginLeft: 30 }}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
          {i < 29 ? <Divider /> : undefined}
        </>);
    }
    return list;
  }

  public render() {
    return (
      <main>
        <Paper>
          <List>
            {this.createListItems(this.state)}
          </List>
        </Paper>
      </main>
    );
  }
}