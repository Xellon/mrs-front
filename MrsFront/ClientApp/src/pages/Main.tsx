import * as React from "react";
import "./Main.scss";
import { Button, List } from "@material-ui/core";
import SuggestedMovie from "../components/SuggestedMovie";

export default class Main extends React.Component {

  public render() {
    return (
      <main>
        <Button>
          Request a movie
                </Button>
        <div>
          <h3>Last suggested movies</h3>
          <List>
            <SuggestedMovie title="Movie A" possibleRating={10} />
            <SuggestedMovie title="Movie B" possibleRating={9.5} />
            <SuggestedMovie title="Movie C" possibleRating={9.4} />
            <SuggestedMovie title="Movie D" possibleRating={8} />
          </List>
        </div>
      </main>
    );
  }
}