import * as React from "react";
import { IconButton, Button, Typography, Paper, CircularProgress } from "@material-ui/core";
import PrintIcon from "@material-ui/icons/Print";
import { Utils } from "../../common/Utils";
import { withRouter } from "react-router";
import * as DB from "../../model/DB";

// tslint:disable-next-line:no-var-requires
const printJS = require("print-js");

// tslint:disable-next-line:jsx-no-lambda
const BackButton = withRouter(({ history }) => (<Button onClick={() => history.push("/receipts")}>Back</Button>));

interface Props {
  id: number;
}

interface State {
  receipt?: DB.Receipt;
}

export class Receipt extends React.PureComponent<Props, State> {
  public readonly state: State = {};

  private onPrintClick = () => {
    printJS("receipt-form", "html");
  }

  public async componentDidMount() {
    const response = await Utils.fetchBackend(`/api/data/receipt?id=${this.props.id}`);

    if (!response.ok)
      return;

    const receipt = await response.json() as DB.Receipt;

    this.setState({ receipt });
  }

  public render() {
    return (
      <>
        <BackButton />
        <Paper>
          <div id="receipt-form">
            <Typography>Receipt No. {this.props.id}</Typography>
            {this.state.receipt
              ?
              <>
                <p>
                  Type: {this.state.receipt.receiptType}
                </p>
                <p>
                  Payment amount: {this.state.receipt.paymentAmount} Euros
                </p>
                <p>
                  Receipt date: {this.state.receipt.receiptDate}
                </p>
              </>
              :
              <CircularProgress />}
          </div>
          <IconButton
            onClick={this.onPrintClick}
          >
            <PrintIcon />
          </IconButton>
        </Paper>

      </>
    );
  }
}