import * as React from "react";
import { TextField, ListItemText, ListItem, ListItemAvatar, IconButton } from "@material-ui/core";
import Event from "../../common/CustomEvent";
import DeleteIcon from "@material-ui/icons/Delete";
import Autocomplete, { AutocompleteItem } from "../../components/Autocomplete";
import * as Model from "../../model/Model";
import { Utils } from "../../common/Utils";

export interface UserMovieForm {
  Id?: number;
  rating?: number;
}

interface Props {
  id: number;
  onDelete: (id: number) => void;
  submitEvent: Event;
  onSubmit: (info: UserMovieForm) => void;
  movies: Model.Movie[];
}

type State = UserMovieForm;

export default class UserMovie extends React.Component<Props, State> {
  public readonly state: State = {};

  constructor(props: Props) {
    super(props);
    props.submitEvent.register(this._onSubmit);
  }

  private _onSubmit = () => {
    if (!this.state.Id || !this.state.rating)
      return false;

    this.props.onSubmit({
      Id: this.state.Id,
      rating: this.state.rating,
    });
    return true;
  }

  private _onDelete = () => {
    this.props.onDelete(this.props.id);
  }

  private _onTitleChange = (selectedMovie: AutocompleteItem) => {
    const movie = this.props.movies.find(movie => movie.title === selectedMovie.value);
    this.setState({ Id: movie.id });
  }

  private _onRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      this.setState({ rating: undefined });
      return;
    }
    const rating = e.target.valueAsNumber;
    if (isNaN(rating) || rating < 1 || rating > 10) {
      this.setState({ rating: 1 });
      return;
    }

    this.setState({ rating });
  }

  public render() {
    return (
      <ListItem>
        <ListItemAvatar>
          <img
            height="120px"
            src={this.state.Id !== undefined
              ? this.props.movies[this.state.Id].imageUrl
              : Utils.DEFAULT_MOVIE_IMAGE}
          />
        </ListItemAvatar>
        <ListItemText>
          <Autocomplete
            items={this.props.movies.map((movie, index) => ({ value: movie.title, index }))}
            textFieldProps={{
              fullWidth: true,
              label: "Title",
              margin: "normal",
              error: this.state.Id === undefined,
            }}
            onSelectionChanged={this._onTitleChange}
          />
          <TextField
            style={{ width: "48px", display: "block" }}
            label="Rating"
            value={this.state.rating}
            onChange={this._onRatingChange}
            type="number"
            margin="normal"
            error={!this.state.rating}
          />
        </ListItemText>
        <ListItemAvatar>
          <IconButton onClick={this._onDelete}>
            <DeleteIcon />
          </IconButton>
        </ListItemAvatar>
      </ListItem>
    );
  }
}