import * as React from "react";
import { List, Paper, Typography, Divider, ListItem, CircularProgress } from "@material-ui/core";
import AddMovieButton from "../../components/AddMovieButton";
import UserMovie, { UserMovieForm } from "./Movie";
import Event from "../../common/CustomEvent";

interface Props {
  submitEvent: Event;
  onSubmit: (info: UserMovieForm) => void;
}

interface State {
  movies: Map<number, React.ReactNode>;
  movieData?: MovieInfo[];
}

interface MovieInfo {
  title: string;
  imageUrl: string;
}

const movieList: MovieInfo[] = [
  {
    title: "Avengers",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/719SFBdxRtL._SY679_.jpg",
  },
  {
    title: "Avengers: Infinity War",
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/A1t8xCe9jwL._SY550_.jpg",
  },
];

export default class Movies extends React.Component<Props, State> {
  private _lastId = 0;

  public readonly state: State = {
    movies: new Map<number, React.ReactNode>(),
  }

  private createNewId() {
    return ++this._lastId;
  }

  private loadMovies() {
    // Load from server
    this.setState({ movieData: movieList });
  }

  private _onMovieDelete = (id: number) => {
    const movies = this.state.movies;
    movies.delete(id);
    this.setState({ movies });
  }

  private _onAddNewMovie = () => {
    const movies = this.state.movies;
    const id = this.createNewId();
    movies.set(id,
      <UserMovie
        key={"user_movie_" + id}
        id={id}
        onSubmit={this.props.onSubmit}
        submitEvent={this.props.submitEvent}
        onDelete={this._onMovieDelete}
        movieList={this.state.movieData}
      />)
    this.setState({ movies });
  }

  public componentDidMount() {
    this.loadMovies();
  }

  public render() {
    return (
      <Paper style={{ margin: "5px 0", padding: 10 }}>
        <Typography variant="title">Movies</Typography>
        <List>
          {this.state.movieData
            ?
            <AddMovieButton onClick={this._onAddNewMovie} />
            :
            <ListItem>
              <CircularProgress />
            </ListItem>}
          {Array.from(this.state.movies.values(), movie => {
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