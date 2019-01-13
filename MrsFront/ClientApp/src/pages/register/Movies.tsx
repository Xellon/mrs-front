import * as React from "react";
import { List, Paper, Typography, Divider, ListItem, CircularProgress } from "@material-ui/core";
import AddMovieButton from "../../components/AddMovieButton";
import UserMovie, { UserMovieForm } from "./UserMovie";
import { CustomEvent } from "../../common/CustomEvent";
import { Utils } from "../../common/Utils";
import * as DB from "../../model/DB";

interface Props {
  submitEvent: CustomEvent;
  onSubmit: (info: UserMovieForm) => void;
}

interface State {
  movieComponents: Map<number, React.ReactNode>;
  movies?: DB.Movie[];
}

export default class Movies extends React.Component<Props, State> {
  private _lastId = 0;

  public readonly state: State = {
    movieComponents: new Map<number, React.ReactNode>(),
  };

  private createNewId() {
    return ++this._lastId;
  }

  private async loadMovies() {
    const response = await Utils.fetchBackend("/api/data/movies");

    if (!response.ok)
      return;

    const movies = await response.json() as DB.Movie[];

    this.setState({ movies: movies });
  }

  private _onMovieDelete = (id: number) => {
    const movies = this.state.movieComponents;
    movies.delete(id);
    this.setState({ movieComponents: movies });
  }

  private _onAddNewMovie = () => {
    const movies = this.state.movieComponents;
    const id = this.createNewId();
    movies.set(id, (
      <UserMovie
        key={"user_movie_" + id}
        id={id}
        onSubmit={this.props.onSubmit}
        submitEvent={this.props.submitEvent}
        onDelete={this._onMovieDelete}
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
            <AddMovieButton onClick={this._onAddNewMovie} />
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