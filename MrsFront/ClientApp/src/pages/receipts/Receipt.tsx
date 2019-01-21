import * as React from "react";
import { IconButton, Button, Typography, Paper, CircularProgress } from "@material-ui/core";
import PrintIcon from "@material-ui/icons/Print";
import { Utils } from "../../common/Utils";
import { withRouter } from "react-router-dom";
import * as DB from "../../model/DB";

import "./Receipt.scss";

// tslint:disable-next-line:no-var-requires
const printJS = require("print-js");

// tslint:disable-next-line:jsx-no-lambda
const BackButton = withRouter(({ history }) => (
  <Button
    style={{ marginBottom: 30 }}
    onClick={Utils.createOnNavigationClick(history, "/receipts")}
    variant="outlined"
  >
    <Typography>
      Back
    </Typography>

  </Button>
));

const boldedStyle: React.CSSProperties = { fontWeight: "bold" };

interface Props {
  id: number;
}

interface State {
  receipt?: DB.Receipt;
  user?: DB.User;
}

export class Receipt extends React.PureComponent<Props, State> {
  public readonly state: State = {};

  private onPrintClick = () => {
    printJS({
      printable: "receipt-form",
      type: "html",
      targetStyles: ["*"],
    });
  }

  private _onPayClick = async () => {
    const response = await Utils.fetchBackend(`/api/data/receipt/pay?id=${this.props.id}`, { method: "POST" });

    if (!response.ok)
      return;

    const receipt: DB.Receipt = await response.json();
    this.setState({ receipt });
  }

  private async getReceipt(id: number): Promise<DB.Receipt> {
    const response = await Utils.fetchBackend(`/api/data/receipt?id=${id}&includePayment=true`);

    if (!response.ok)
      return;

    return response.json();
  }

  private async getUser(id: number): Promise<DB.User> {
    const response = await Utils.fetchBackend(`/api/data/user?userId=${id}`);

    if (!response.ok)
      return;

    return response.json();
  }

  private receiptTypeToString(type: DB.ReceiptType) {
    switch (type) {
      case DB.ReceiptType.Membership:
        return "Payment for membership";
      case DB.ReceiptType.ExtraRecommendation:
        return "Payment for extra membership recommendation";
      case DB.ReceiptType.OneTimeRecommendation:
        return "Regular payment for recommendation";
    }
  }

  public async componentDidMount() {
    const receipt = await this.getReceipt(this.props.id);

    const user = await this.getUser(receipt.userId);

    this.setState({ receipt, user });
  }

  public renderData(receipt: DB.Receipt, user: DB.User) {
    return (
      <div className="receipt-form-data">
        <Typography style={boldedStyle}>User email:</Typography>
        <Typography>{user.email}</Typography>

        <Typography style={boldedStyle}>Type:</Typography>
        <Typography>{this.receiptTypeToString(receipt.receiptType)}</Typography>

        <Typography style={boldedStyle}>Payment amount:</Typography>
        <Typography>{receipt.paymentAmount} €</Typography>

        <Typography style={boldedStyle}>Receipt date:</Typography>
        <Typography>{this.convertDate(receipt.receiptDate)}</Typography>
      </div>
    );
  }

  private convertDate(dateString: string): string {
    const date = new Date(dateString);

    return `${date.toISOString().slice(0, 10)} ${date.getHours()}:${date.getMinutes()}`;
  }

  public render() {
    return (
      <>
        <BackButton />
        <Paper>
          <div id="receipt-form">
            <Typography variant="h6">Receipt No. {this.props.id}</Typography>
            {this.state.receipt && this.state.user
              ? this.renderData(this.state.receipt, this.state.user)
              : <CircularProgress />}
          </div>
          <IconButton onClick={this.onPrintClick}>
            <PrintIcon />
          </IconButton>
        </Paper>

        <Paper className="receipt-payment-info">
          <div className="receipt-payment-info-text">
            <Typography style={boldedStyle}>Payment status:</Typography>
            {!this.state.receipt
              ? <CircularProgress />
              : this.state.receipt.payment
                ? <Typography>Paid for</Typography>
                : <Typography color="secondary">Not paid for</Typography>}
            {this.state.receipt && this.state.receipt.payment ?
              <>
                <Typography style={boldedStyle}>Payment date</Typography>
                <Typography>{this.convertDate(this.state.receipt.payment.paymentDate)}</Typography>
              </>
              : undefined}
          </div>

          {this.state.receipt && !this.state.receipt.payment ?
            <Button
              style={{ display: "block", margin: "20px auto" }}
              variant="outlined"
              color="secondary"
              onClick={this._onPayClick}
            >
              Pay for receipt
            </Button> : undefined}
        </Paper>
      </>
    );
  }
}