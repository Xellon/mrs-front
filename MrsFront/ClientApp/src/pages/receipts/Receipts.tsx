import * as React from "react";
import { Receipt } from "./Receipt";
import { ReceiptList } from "./List";

export class Receipts extends React.PureComponent {

  private getReceiptIdFromQuery(): number {
    const urlParams = new URLSearchParams(window.location.search);
    const id = +urlParams.get("id");
    return id && !isNaN(id) ? id : undefined;
  }

  public render() {
    const receiptId = this.getReceiptIdFromQuery();

    return (
      <main>
        {receiptId ? <Receipt id={receiptId} /> : <ReceiptList />}
      </main>
    );
  }
}
