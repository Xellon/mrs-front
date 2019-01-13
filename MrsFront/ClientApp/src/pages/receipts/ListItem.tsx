import { ListItem } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router";
import * as React from "react";
import * as DB from "../../model/DB";

interface Props extends RouteComponentProps {
  receipt: DB.Receipt;
}

class ReceiptListItemBase extends React.PureComponent<Props> {
  private _onClick = () => {
    this.props.history.push(`/receipts?id=${this.props.receipt.id}`);
  }

  public render() {
    return (
      <ListItem button onClick={this._onClick}>
        Receipt {this.props.receipt.id}
      </ListItem>
    );
  }
}

export const ReceiptListItem = withRouter(ReceiptListItemBase);