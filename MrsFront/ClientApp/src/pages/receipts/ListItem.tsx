import { ListItem } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router";
import * as React from "react";
import * as Model from "../../model/Model";

interface Props extends RouteComponentProps {
  receipt: Model.Receipt;
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