import * as React from "react";
import "./Main.scss";
import { Button, List } from "@material-ui/core";
import SuggestedMovie from "../components/SuggestedMovie";

interface ResponseMovie {
  title: string;
  averageRating: number;
}

interface ResponseRecommendedMovie {
  movie: ResponseMovie;
  possibleRating: number;
}

interface State {
  movies: ResponseRecommendedMovie[];
}

export default class Main extends React.Component<{}, State> {
  public readonly state: State = { movies: [] };

  public async componentDidMount() {
    const response = await fetch("http://localhost:4000/api/data/recommendedmovies", {
      method: "GET"
    }).catch(err => err);

    if (!response.ok) {
      this.setState({ movies: [] });
      return;
    }

    const movies: ResponseRecommendedMovie[] = await response.json();
    this.setState({ movies });
  }

  public renderMovies() {
    const movies: React.ReactNode[] = [];
    for (const movie of this.state.movies) {
      movies.push(
        <SuggestedMovie key={movie.movie.title} title={movie.movie.title} possibleRating={movie.possibleRating} />
      );
    }
    return movies;
  }

  public render() {
    return (
      <main>
        <div style={{
          height: 200,
          padding: 1
        }}
        >
          <Button
            style={{
              display: "block",
              margin: "50px auto",
            }}
            variant="contained" >
            Request a movie
          </Button>
        </div>
        <div>
          <h3>Last suggested movies</h3>
          <List>
            {this.renderMovies()}
          </List>
        </div>
      </main>
    );
  }
}