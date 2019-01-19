import { ListItem, ListItemText, ListItemIcon, Avatar } from "@material-ui/core";
import { withRouter, RouteComponentProps } from "react-router-dom";
import * as React from "react";
import * as DB from "../../model/DB";
import MoneyIcon from "@material-ui/icons/AttachMoney";

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
        <ListItemText>
          Receipt {this.props.receipt.id}
        </ListItemText>
        <ListItemIcon>
          <Avatar
            title={this.props.receipt.payment
              ? "Receipt is paid for"
              : "Receipt is not paid for"}
            style={{ backgroundColor: this.props.receipt.payment ? "green" : "red" }}
          >
            <MoneyIcon />
          </Avatar>
        </ListItemIcon>
      </ListItem>
    );
  }
}

export const ReceiptListItem = withRouter(ReceiptListItemBase);