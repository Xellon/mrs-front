import * as React from "react";
import { UserMovies as Movies } from "../../components/usermovies/Movies";
import { Typography } from "@material-ui/core";
import { CustomEvent } from "../../common/CustomEvent";
import * as Model from "../../model/Model";
import * as DB from "../../model/DB";
import { Utils } from "../../common/Utils";
import { Authentication } from "../../common/Authentication";

interface State {
  userMovies?: Model.UserMovie[];
}

export class UserMovies extends React.PureComponent<{}, State> {
  public readonly state: State = {};

  private _saveEvent = new CustomEvent();

  private _onSave = async (movies: Model.UserMovie[]) => {
    const user = Authentication.getSignedInUser();

    await Utils.fetchBackend(`/api/data/usermovies?userId=${user.id}`, {
      method: "POST",
      body: JSON.stringify(movies),
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
    })

    this.setState({ userMovies: movies });
  }

  public async componentDidMount() {
    const user = Authentication.getSignedInUser();

    const response = await Utils.fetchBackend(`/api/data/usermovies?userId=${user.id}`);

    if (!response.ok)
      return;

    const userMovies = await response.json() as DB.UserMovie[];
    this.setState({ userMovies: userMovies.map(m => ({ movieId: m.movieId, rating: m.rating })) });
  }

  public render() {
    return (
      <main>
        <Typography variant="headline">User movies</Typography>
        <Movies onSubmit={this._onSave} submitEvent={this._saveEvent} />
      </main>
    );
  }
}