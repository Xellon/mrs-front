import * as React from "react";
import {
  TextField,
  ListItemText,
  ListItem,
  ListItemAvatar,
  IconButton
} from "@material-ui/core";
import { CustomEvent } from "../../common/CustomEvent";
import DeleteIcon from "@material-ui/icons/Delete";
import Autocomplete, { AutocompleteItem } from "../Autocomplete";
import * as DB from "../../model/DB";
import * as Model from "../../model/Model";
import { Utils } from "../../common/Utils";

interface Props {
  id: number;
  onDelete: (id: number) => void;
  submitEvent: CustomEvent;
  onSubmit: (info: Model.UserMovie) => void;
  movies: DB.Movie[];
}

interface State {
  movieId?: number;
  rating?: number;
}

export default class UserMovie extends React.Component<Props, State> {
  public readonly state: State = {};

  constructor(props: Props) {
    super(props);
    props.submitEvent.register(this._onSubmit);
  }

  private _onSubmit = () => {
    if (!this.state.movieId || !this.state.rating)
      return false;

    this.props.onSubmit({
      movieId: this.state.movieId,
      rating: this.state.rating,
    });
    return true;
  }

  private _onDelete = () => {
    this.props.onDelete(this.props.id);
  }

  private _onTitleChange = (selectedMovie: AutocompleteItem) => {
    const movie = this.props.movies.find(movie => movie.title === selectedMovie.value);
    this.setState({ movieId: movie.id });
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
            src={this.state.movieId !== undefined
              ? this.props.movies.find(m => m.id === this.state.movieId).imageUrl
              : Utils.DEFAULT_MOVIE_IMAGE_URL}
          />
        </ListItemAvatar>
        <ListItemText>
          <Autocomplete
            items={this.props.movies.map((movie, index) => ({ value: movie.title, index }))}
            textFieldProps={{
              fullWidth: true,
              label: "Title",
              margin: "normal",
              error: !this.state.movieId,
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