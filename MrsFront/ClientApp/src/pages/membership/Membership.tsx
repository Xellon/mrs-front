import * as React from "react";
import { Paper, Switch, CircularProgress, Typography, List } from "@material-ui/core";
import { Utils } from "../../common/Utils";
import { Authentication } from "../../common/Authentication";
import * as DB from "../../model/DB";
import { ReceiptListItem } from "../receipts/ListItem";
import * as _ from "lodash";

interface State {
  membership?: DB.Membership;
  membershipLoading: boolean;
  updateInProgress: boolean;
  receipt?: DB.Receipt;
  receiptLoading: boolean;
}

export class Membership extends React.PureComponent<{}, State> {
  public readonly state: State = {
    membershipLoading: true,
    updateInProgress: false,
    receiptLoading: false,
  };

  private async getFullReceipt(id: number): Promise<DB.Receipt> {
    const response = await Utils.fetchBackend(`/api/data/receipt?id=${id}&includePayment=true`);

    if (!response.ok)
      return undefined;

    return response.json();
  }

  private _onChange = async () => {
    const user = Authentication.getSignedInUser();
    const method = this.state.membership ? "DELETE" : "POST";

    this.setState({ updateInProgress: true });
    const response = await Utils.fetchBackend(`/api/data/user/membership?userId=${user.id}`, { method });

    if (response.ok) {
      if (await response.clone().text()) {
        const membership: DB.Membership = await response.json();
        this.setState({ receiptLoading: true });
        const receipt = await this.getFullReceipt(_.maxBy(membership.receipts, r => r.receiptDate).id);
        this.setState({ membership, receipt, updateInProgress: false, receiptLoading: false });
      } else
        this.setState({ membership: undefined, updateInProgress: false });
    } else
      this.setState({ updateInProgress: false });
  }

  public async componentDidMount() {
    const user = Authentication.getSignedInUser();
    const response = await Utils.fetchBackend(`/api/data/user/membership?userId=${user.id}`);

    if (!response.ok) {
      this.setState({ membershipLoading: false });
      return;
    }

    if (await response.clone().text()) {
      const membership: DB.Membership = await response.json();
      this.setState({ receiptLoading: true });
      const receipt = await this.getFullReceipt(_.maxBy(membership.receipts, r => r.receiptDate).id);
      this.setState({ membership, receipt, membershipLoading: false, receiptLoading: false });
    } else
      this.setState({ membership: undefined, membershipLoading: false });
  }

  public render() {
    return (
      <main>
        <Paper style={{ padding: 30 }}>
          {this.state.membershipLoading ? <CircularProgress /> :
            <>
              Become a member
              <Switch
                checked={!!this.state.membership}
                onChange={this._onChange}
                color="secondary"
                disabled={this.state.updateInProgress}
              />
              {this.state.updateInProgress ? <CircularProgress /> : undefined}
              {this.state.membership ?
                <div>
                  <Typography>
                    Receipt:
                  </Typography>
                  <List>
                    {this.state.receipt ? <ReceiptListItem receipt={this.state.receipt} /> : undefined}
                  </List>
                </div> : undefined}
            </>}
        </Paper>
      </main>
    );
  }
}