import * as React from "react";
import { Paper, Switch, CircularProgress } from "@material-ui/core";
import { Utils } from "../../common/Utils";
import { Authentication } from "../../common/Authentication";

interface State {
  isMember?: boolean;
  updateInProgress: boolean;
}

export class Membership extends React.PureComponent<{}, State> {
  public readonly state: State = { updateInProgress: false };

  private _onChange = async () => {
    const user = Authentication.getSignedInUser();
    const method = this.state.isMember ? "DELETE" : "POST";

    this.setState({ updateInProgress: true });
    const response = await Utils.fetchBackend(`/api/data/user/isMember?userId=${user.id}`, { method });

    if (response.ok)
      this.setState(prevState => ({ isMember: !prevState.isMember, updateInProgress: false }));
    else
      this.setState({ updateInProgress: false });
  }

  public async componentDidMount() {
    const user = Authentication.getSignedInUser();
    const response = await Utils.fetchBackend(`/api/data/user/isMember?userId=${user.id}`);

    this.setState({ isMember: (await response.text()) === "true" });
  }

  public render() {
    return (
      <main>
        <Paper style={{ padding: 30 }}>
          {this.state.isMember !== undefined
            ?
            <>
              Become a member
              <Switch
                checked={this.state.isMember}
                onChange={this._onChange}
                color="secondary"
                disabled={this.state.updateInProgress}
              />
              {this.state.updateInProgress ? <CircularProgress /> : undefined}
            </>
            : <CircularProgress />}

        </Paper>
      </main>
    );
  }
}