import * as React from "react";
import { List as VirtualizedList, ListRowProps } from "react-virtualized";
import * as DB from "../../model/DB";
import { Paper, Divider } from "@material-ui/core";
import { Utils } from "../../common/Utils";

interface State {
  users?: DB.User[];
}

export class Users extends React.PureComponent {
  public readonly state: State = {};
  private _mainRef = React.createRef<HTMLMainElement>();

  private _renderUser = (props: ListRowProps) => {
    const user = this.state.users[props.index];
    return (
      <div key={props.key} style={{ ...props.style, padding: 10 }}>
        <p>Email: {user.email}</p>
        <p>IsMember: {user.membershipId ? "Yes" : "No"}</p>
        <p>User type: {user.userType}</p>
        <Divider />
      </div>
    );
  }

  public async componentDidMount() {
    const response = await Utils.fetchBackend("/api/data/user/all");

    if (!response.ok)
      return;

    const users: DB.User[] = await response.json();
    this.setState({ users });
  }

  public render() {
    let dimensions: { width: number, height: number } | undefined;

    if (this._mainRef.current) {
      const box = this._mainRef.current.getBoundingClientRect();
      dimensions = { width: box.width, height: box.height };
    }

    return (
      <main ref={this._mainRef}>
        <Paper>
          {dimensions && this.state.users ?
            <VirtualizedList
              rowRenderer={this._renderUser}
              rowHeight={139}
              rowCount={this.state.users.length}
              {...dimensions}
            />
            : undefined}
        </Paper>
      </main>
    );
  }
}