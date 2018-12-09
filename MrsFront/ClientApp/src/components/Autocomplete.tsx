import * as React from "react";
import Downshift, { ControllerStateAndHelpers } from "downshift";
import { TextField, Paper } from "@material-ui/core";
import { TextFieldProps } from "@material-ui/core/TextField";

export interface AutocompleteItem {
  value: string;
  index: number;
}

interface Props {
  items: AutocompleteItem[];
  textFieldProps?: TextFieldProps;
  onSelectionChanged: (item: AutocompleteItem) => void;
}

interface State {
  input: string;
  selectedItem?: string;
}

export default class Autocomplete extends React.Component<Props> {
  public readonly state: State = {
    input: "",
  };

  private _onAutocomplete = (selectedItem: AutocompleteItem) => {
    this.setState({ selectedItem: selectedItem.value });
    this.props.onSelectionChanged(selectedItem);
  }

  private _itemToString = (item: AutocompleteItem) => {
    return item.value;
  }

  private renderTextField = (controllerState: ControllerStateAndHelpers<AutocompleteItem>) => {
    return (
      <div>
        <TextField {...{ ...controllerState.getInputProps(), ...this.props.textFieldProps }} />
        <Paper>
          <ul {...controllerState.getMenuProps({className: "autocomplete-suggestion-list"})}>
            {controllerState.isOpen
              ?
              this.props.items
                .filter(item => !controllerState.inputValue
                  || item.value.toLocaleLowerCase().includes(controllerState.inputValue.toLocaleLowerCase()))
                .map((item, index) => (
                  <li
                    {...controllerState.getItemProps({
                      key: item.value,
                      index,
                      item,
                    })}
                  >
                    {item.value}
                  </li>
                ))
              : undefined
            }
          </ul>
        </Paper>
      </div>
    );
  }

  public render() {
    return (
      <Downshift
        onChange={this._onAutocomplete}
        selectedItem={this.state.selectedItem}
        itemToString={this._itemToString}
      >
        {this.renderTextField}
      </Downshift>
    );
  }
}