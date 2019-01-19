import * as React from "react";
import { List, Paper, CircularProgress } from "@material-ui/core";
import { ReceiptListItem } from "./ListItem";
import * as DB from "../../model/DB";
import { Utils } from "../../common/Utils";
import { Authentication } from "../../common/Authentication";

interface State {
  receipts?: DB.Receipt[];
}

export class ReceiptList extends React.PureComponent<{}, State> {
  public readonly state: State = {};

  public async componentDidMount() {
    const user = Authentication.getSignedInUser();

    let response: Response;

    // tslint:disable-next-line:prefer-conditional-expression
    if (user.userType === DB.UserType.Client)
      response = await Utils.fetchBackend(`/api/data/receipts?includePayment=true&userId=${user.id}`);
    else
      response = await Utils.fetchBackend("/api/data/receipts?includePayment=true");

    if (!response.ok)
      return;

    const receipts = await response.json() as DB.Receipt[];

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
