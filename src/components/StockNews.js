import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

const styles = {
    header:{
        backgroundColor: '#f2ab38'
    }
}


class StockNews extends Component {
    

    ListItemLink = link => {
        return <ListItem button component="a"{...link} />
    }

    renderNews = () => {
        return this.props.news ?
        this.props.news.map(story => {
            return (
                <this.ListItemLink href={story.url} target="_blank">
                    <ListItemText primary={story.title} secondary={story.description} />
                </this.ListItemLink>
            )
        }):
        null
    }

    render() {
        // console.log(this.props)
        return (
            <Paper className={styles.header}>
                <Paper style={{maxHeight: 500, maxWidth:1700,  overflow: 'auto'}}>
                    <List>
                        {this.renderNews()}
                    </List>
                </Paper>
            </Paper>

        );
    }
}

export default StockNews;