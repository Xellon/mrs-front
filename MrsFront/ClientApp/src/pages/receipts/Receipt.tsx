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

interface Props {
  id: number;
}

interface State {
  receipt?: DB.Receipt;
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

  private async getReceipt(): Promise<DB.Receipt> {
    const response = await Utils.fetchBackend(`/api/data/receipt?id=${this.props.id}&includePayment=true`);

    if (!response.ok)
      return;

    return response.json();
  }

  private receiptTypeToString(type: DB.ReceiptType) {
    switch (type) {
      case DB.ReceiptType.Membership:
        return "Payment for membership";
      case DB.ReceiptType.ExtraRecommendation:
        return "Payment from extra membership recommendation";
      case DB.ReceiptType.OneTimeRecommendation:
        return "Regular payment for recommendation";
    }
  }

  public async componentDidMount() {
    const receipt = await this.getReceipt();

    this.setState({ receipt });
  }

  public renderData(receipt: DB.Receipt) {
    const date = new Date(this.state.receipt.receiptDate).toISOString().slice(0, 10);

    return (
      <div className="receipt-form-data">
        <p>User email:</p><p>{this.state.receipt.userid}</p>
        <p>Type:</p><p>{this.receiptTypeToString(this.state.receipt.receiptType)}</p>
        <p>Payment amount:</p><p>{this.state.receipt.paymentAmount} €</p>
        <p>Receipt date:</p><p>{date}</p>
      </div>
    );
  }

  public render() {
    return (
      <>
        <BackButton />
        <Paper>
          <div id="receipt-form">
            <Typography>Receipt No. {this.props.id}</Typography>
            {this.state.receipt ? this.renderData(this.state.receipt) : <CircularProgress />}
          </div>
          <IconButton onClick={this.onPrintClick}>
            <PrintIcon />
          </IconButton>
        </Paper>

        <Paper className="receipt-payment-info">
          <div className="receipt-payment-info-text">
            <Typography>
              Payment status:
            </Typography>
            {!this.state.receipt
              ? <CircularProgress />
              : this.state.receipt.payment
                ? <Typography>Paid for</Typography>
                : <Typography color="secondary">Not paid for</Typography>}
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