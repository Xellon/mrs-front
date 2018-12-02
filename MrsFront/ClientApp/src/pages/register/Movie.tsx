import * as React from "react";
import { TextField, ListItemText, ListItem, Avatar, ListItemAvatar, IconButton, Icon } from "@material-ui/core";
import Event from "../../common/CustomEvent";
import DeleteIcon from "@material-ui/icons/Delete";

export interface UserMovieForm {
  title?: string;
  rating?: number;
}

interface Props {
  id: number;
  onDelete: (id: number) => void;
  submitEvent: Event;
  onSubmit: (info: UserMovieForm) => void;
  movieList: {title: string, imageUrl: string}[];
}

interface State extends UserMovieForm {
}

export default class UserMovie extends React.Component<Props, State> {
  public readonly state: State = {

  }

  constructor(props: Props) {
    super(props);
    props.submitEvent.register(this._onSubmit);
  }

  private _onSubmit = () => {
    if(!this.state.title || !this.state.rating)
      return false;
    
    this.props.onSubmit({
      title: this.state.title,
      rating: this.state.rating,
    });
    return true;
  }

  private _onDelete = () => {
    this.props.onDelete(this.props.id);
  }

  private _onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({title: e.target.value});
  }

  private _onRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value === "") {
      this.setState({rating: undefined});
      return;
    }
    const rating = e.target.valueAsNumber;
    if(isNaN(rating) || rating < 1 || rating > 10){
      this.setState({rating: 1});
      return;
    }
      
    this.setState({rating});
  }

  public render() {
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar src={"https://is4-ssl.mzstatic.com/image/thumb/Video122/v4/02/cf/bc/02cfbc57-8dcb-09f7-d1d9-67da6e94d347/pr_source.lsr/268x0w.png"}/>
        </ListItemAvatar>
        <ListItemText>
          <TextField 
            fullWidth
            label="Title" 
            margin="normal"
            onChange={this._onTitleChange}
            error={!this.state.title}
          />
          <TextField 
            style={{width: "48px", display: "block"}} 
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