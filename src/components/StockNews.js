import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


class StockNews extends Component {
    

    ListItemLink = link => {
        return <ListItem button component="a"{...link} />
    }

    renderNews = () => {
        return this.props.news.map(story => {
            return (
                <this.ListItemLink href={story.url}>
                    <ListItemText primary={story.title} secondary={story.description} />
                </this.ListItemLink>
            )
        })
    }

    render() {
        // console.log(this.props)
        return (
           <Paper>
               <List>
                    {this.renderNews()}
               </List>
           </Paper>
        );
    }
}

export default StockNews;