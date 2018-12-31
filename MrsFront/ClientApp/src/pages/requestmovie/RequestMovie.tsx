import * as React from "react";
import { Button, Chip } from "@material-ui/core";
import * as Model from "../../model/Model";
import { Utils } from "../../common/Utils";
import "./RequestMovie.scss";
import { Authentication } from "../../common/Authentication";

interface State {
  tags: Model.Tag[];
  [index: number]: boolean;
}

export class RequestMovie extends React.Component<{}, State> {
  public readonly state: State = {
    tags: [],
  };

  private renderTags(state: State) {
    return state.tags.map(tag => {
      return (
        <Chip
          key={tag.id}
          className={"requestmovie-chip" + (state[tag.id] ? " selected" : "")}
          label={tag.text}
          variant="outlined"
          onClick={() => this.setState(prevState => ({ [tag.id]: !prevState[tag.id] }))}
        />);
    });
  }

  private _onClickGenerateRecommendations = async () => {
    const user = Authentication.getSignedInUser();
    if (!user)
      return;

    await Utils.fetchBackend(
      `/api/data/generaterecommendations?userId=${user.id}`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          Object.keys(this.state)
            .filter(key => !isNaN(+key) && this.state[+key]))
      });
  }

  public async componentDidMount() {
    const response = await Utils.fetchBackend("/api/data/tags");

    if (!response.ok)
      return;

    const tags: Model.Tag[] = await response.json();

    this.setState({ tags });
  }

  public render() {
    return (
      <main>
        <div>
          {this.renderTags(this.state)}
        </div>
        <Button variant="outlined" onClick={this._onClickGenerateRecommendations}>
          Generate recommendations
        </Button>
      </main>
    );
  }
}