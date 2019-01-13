import * as React from "react";
import * as DB from "../../model/DB";
import { Typography, Divider, Avatar, Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { Client } from "../../common/Client";
import { withRouter } from "react-router";
import { Utils } from "../../common/Utils";

export function createNavigationButton(text: string, path: string, style?: React.CSSProperties) {
  return withRouter(({ history }) => (
    <Button
      variant="contained"
      fullWidth
      style={{ margin: "0 auto 20px auto", display: "block", ...style }}
      onClick={Utils.createOnNavigationClick(history, path)}
    >
      {text}
    </Button>
  ));
}

const ChangeMoviesButton = createNavigationButton("Change movies", "/usermovies");
const RequestRecommendationButton = createNavigationButton("Request a Recommendation", "/requestmovie");
const ReceiptsButton = createNavigationButton("Receipts", "/receipts");
const MembershipButton = createNavigationButton("Become a Member!", "/membership", { background: "gold" });

const MovieListButton = createNavigationButton("Movie List", "/movies");
const UsersButton = createNavigationButton("Users", "/users");

interface Props {
  user: DB.User;
}

interface State {
  isClientMember: boolean
}

export class UserNavigation extends React.Component<Props, State> {
  private _client?: Client;

  constructor(props: Props) {
    super(props);

    this.state = {
      isClientMember: false,
    }

    if (props.user.userType === DB.UserType.Client)
      this._client = new Client(props.user);
  }

  private getButtons() {
    switch (this.props.user.userType) {
      case DB.UserType.Client:
        return (
          <>
            <ChangeMoviesButton />
            <RequestRecommendationButton />
            <ReceiptsButton />
            {!this.state.isClientMember ? <MembershipButton /> : undefined}
          </>);
      case DB.UserType.Admin:
        return (
          <>
            <MovieListButton />
            <UsersButton />
          </>);
      case DB.UserType.Finance:
        return (
          <>
            <ReceiptsButton />
          </>);
    }

  }

  public async componentDidMount() {
    if (!this._client)
      return;

    if (await this._client.getMembership())
      this.setState({ isClientMember: true });
  }

  public render() {
    return (
      <>
        <Avatar style={{ margin: "auto", border: this.state.isClientMember ? "solid 6px gold" : undefined }}>
          <PersonIcon />
        </Avatar>
        <Typography style={{ marginBottom: 30, marginTop: 20 }}>
          {this.props.user.email}
        </Typography>
        {this.getButtons()}
        <Divider style={{ margin: "20px 10px" }} />
      </>
    );
  }
}