import * as React from "react";
import "./Main.scss";
import { Button, List } from "@material-ui/core";
import SuggestedMovie from "../../components/SuggestedMovie";
import { Utils } from "../../common/Utils";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Authentication } from "../../common/Authentication";
import * as DB from "../../model/DB";

type MovieId = number;

interface State {
  movies?: Map<MovieId, DB.Movie>;
  recommendedMovies?: DB.RecommendedMovie[];
}

const RequestRecommendationButton = withRouter(({ history }) => (
  <Button
    color="inherit"
    style={{
      display: "block",
      margin: "50px auto",
    }}
    variant="contained"
    onClick={Utils.createOnNavigationClick(history, "/requestmovie")}
  >
    <Button>
      Request a Movie
    </Button>
  </Button>
));

export default class Main extends React.Component<RouteComponentProps, State> {
  public readonly state: State = {};

  constructor(props: RouteComponentProps) {
    super(props);

    const user = Authentication.getSignedInUser();
    switch (user.userType) {
      case DB.UserType.Client:
        break;
      case DB.UserType.Admin:
        props.history.push("/movies");
        break;
      case DB.UserType.Finance:
        props.history.push("/receipts");
        break;
    }
  }

  private async getMovies(): Promise<DB.Movie[] | undefined> {
    const response = await Utils.fetchBackend("/api/data/movies");

    if (!response.ok)
      return undefined;

    return response.json();
  }

  private async getRecommendedMovies(): Promise<DB.RecommendedMovie[] | undefined> {
    const user = Authentication.getSignedInUser();

    const response = await Utils.fetchBackend(`/api/data/recommendedmovies/latest?userId=${user.id}`);

    if (!response.ok)
      return undefined;

    return response.json();
  }

  public async componentDidMount() {
    const recommendedMovies = await this.getRecommendedMovies();

    const movieArray = await this.getMovies();

    const movies = new Map<MovieId, DB.Movie>();

    for (const movie of movieArray) {
      movies.set(movie.id, movie);
    }

    this.setState({ recommendedMovies, movies });
  }

  public renderMovies() {
    if (!this.state.movies || !this.state.recommendedMovies)
      return;

    return this.state.recommendedMovies.map(movie => (
      <SuggestedMovie
        key={movie.movieId}
        title={this.state.movies.get(movie.movieId).title}
        possibleRating={movie.possibleRating}
      />
    ));
  }

  public render() {
    return (
      <main>
        <div
          style={{
            height: 200,
            padding: 1,
          }}
        >
          <RequestRecommendationButton />
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