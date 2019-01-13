import * as React from "react";
import { List, Paper, Typography, Divider, ListItem, CircularProgress } from "@material-ui/core";
import AddMovieButton from "../../components/AddMovieButton";
import UserMovie from "./Movie";
import { CustomEvent } from "../../common/CustomEvent";
import { Utils } from "../../common/Utils";
import * as Model from "../../model/Model";
import * as DB from "../../model/DB";

type MovieId = number;

interface Props {
  submitEvent: CustomEvent;
  onSubmit: (info: Model.UserMovie[]) => Promise<void>;
}

interface State {
  movieComponents: Map<number, React.ReactNode>;
  movies?: DB.Movie[];
}

export class UserMovies extends React.Component<Props, State> {
  private _lastId = 0;

  public readonly state: State = {
    movieComponents: new Map<MovieId, React.ReactNode>(),
  };

  private _onSubmit = (movie: Model.UserMovie) => {

  }

  private createNewId() {
    return ++this._lastId;
  }

  private async loadMovies() {
    const response = await Utils.fetchBackend("/api/data/movies");

    if (!response.ok)
      return;

    const movies = await response.json() as DB.Movie[];

    this.setState({ movies });
  }

  private _onUserMovieDelete = (id: number) => {
    const movies = this.state.movieComponents;
    movies.delete(id);
    this.setState({ movieComponents: movies });
  }

  private _onAddNewUserMovie = () => {
    const movies = this.state.movieComponents;
    const id = this.createNewId();
    movies.set(id, (
      <UserMovie
        key={"user_movie_" + id}
        id={id}
        onSubmit={this._onSubmit}
        submitEvent={this.props.submitEvent}
        onDelete={this._onUserMovieDelete}
        movies={this.state.movies}
      />));
    this.setState({ movieComponents: movies });
  }

  public async componentDidMount() {
    this.loadMovies();
  }

  public render() {
    return (
      <Paper style={{ margin: "5px 0", padding: 10 }}>
        <Typography variant="h6">Movies</Typography>
        <List>
          {this.state.movies
            ?
            <AddMovieButton onClick={this._onAddNewUserMovie} />
            :
            <ListItem>
              <CircularProgress />
            </ListItem>}
          {Array.from(this.state.movieComponents.values(), movie => {
            return (
              <>
                <Divider />
                {movie}
              </>
            );
          })}
        </List>
      </Paper>
    );
  }
}