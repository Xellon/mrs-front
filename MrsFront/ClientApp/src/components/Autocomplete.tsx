import * as React from "react";
import Downshift from "downshift";
import { TextField } from "@material-ui/core";

interface Props {
  items: {value: string};
}

export default class Autocomplete extends React.Component<Props> {
  public render() {
    const inputValue = "";
    const selectedItem = "";

    return (
      <Downshift
        inputValue={inputValue}
        onChange={() => {}}
        selectedItem={selectedItem}
      >
        {(isOpen) => (
          <TextField />
        )}  
      </Downshift>
    );
  }
}