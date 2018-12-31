import * as React from "react";
import { List, Paper, CircularProgress } from "@material-ui/core";
import { ReceiptListItem } from "./ListItem";
import * as Model from "../../model/Model";
import { Utils } from "../../common/Utils";
import { Authentication } from "../../common/Authentication";

interface State {
  receipts?: Model.Receipt[];
}

export class ReceiptList extends React.PureComponent<{}, State> {
  public readonly state: State = {};

  public async componentDidMount() {
    const user = Authentication.getSignedInUser();

    let response: Response;

    if (user.userType == Model.UserType.Client)
      response = await Utils.fetchBackend(`/api/data/receipts?userId=${user.id}`);
    else
      response = await Utils.fetchBackend("/api/data/receipts");

    if (!response.ok)
      return;

    const receipts = await response.json() as Model.Receipt[];

    this.setState({ receipts });
  }

  public render() {
    return (
      <Paper>
        <List>
          {this.state.receipts
            ?
            this.state.receipts.map(receipt => <ReceiptListItem key={receipt.id} receipt={receipt} />)
            :
            <CircularProgress />}
        </List>
      </Paper>
    );
  }
}
