import * as React from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import DeleteIcon from '@material-ui/icons/Delete';
import { Paper, ListItemText, Button, IconButton, Divider } from "@material-ui/core";

export class MovieList extends React.Component {
    
    private createListItems(){
        const list: React.ReactNode[] = [];
        for (let i = 0; i < 30; i++) {
            list.push(
                <>
                    <ListItem key={`item_${i}`}>
                        <ListItemText secondary="Magic Beasts and where to find them">
                            Title
                        </ListItemText>
                        <ListItemText secondary="9">
                            Rating
                        </ListItemText>
                        <Avatar>
                            <ImageIcon />
                        </Avatar>
                        <IconButton style={{marginLeft: 30}}>
                            <DeleteIcon />
                        </IconButton>
                    </ListItem>
                    {i < 29 ? <Divider/> : undefined}
                </>);  
        }
        return list;
    }

    public render() {
        return(
            <main>
                <Paper>
                    <List>
                        {this.createListItems()}
                    </List>
                </Paper>
            </main>
        );
    }
}