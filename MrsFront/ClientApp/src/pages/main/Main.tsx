import * as React from "react";
import "./Main.scss";
import { Button, List } from "@material-ui/core";
import SuggestedMovie from "../../components/SuggestedMovie";
import { Utils } from "../../common/Utils";
import { withRouter } from "react-router-dom";
import { Authentication } from "../../common/Authentication";
import { UserType } from "../../model/Model";

interface ResponseMovie {
  title: string;
  averageRating: number;
}

interface ResponseRecommendedMovie {
  movie: ResponseMovie;
  possibleRating: number;
}

interface Props {
  history: any;
}

interface State {
  movies: ResponseRecommendedMovie[];
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

export default class Main extends React.Component<Props, State> {
  public readonly state: State = { movies: [] };

  constructor(props: Props) {
    super(props);

    const user = Authentication.getSignedInUser();
    switch (user.userType) {
      case UserType.Client:
        break;
      case UserType.Admin:
        props.history.push("/movielist");
        break;
      case UserType.Finance:
        props.history.push("/receipts");
        break;
    }
  }

  public async componentDidMount() {
    const response = await Utils.fetchBackend("/api/data/recommendedmovies", {
      method: "GET"
    });

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