import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { Container } from '@material-ui/core';





const useStyles = makeStyles({
    card: {
      minWidth: 275,
      maxWidth: 275
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 25,
    },
    pos: {
      marginBottom: 12,
    },
    green: {
      backgroundColor: 'green'
    },
    red: {
      backgroundColor: 'red'
    }
});





const StockCard = (props) => {
    const classes = useStyles();
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }
      
    const card = {}

    const calculateChange = () => {
      let change = Number(Math.round((props.stock.todayPrice - props.stock.yesterdayPrice) + 'e2') + 'e-2')
      let percent = Number(Math.round(((props.stock.todayPrice / props.stock.yesterdayPrice) - 1) + 'e2') + 'e-2')
      return change > 0 ? (
        card.string = `+${change} (${percent}) %`,
        card.icon = <ArrowUpwardIcon /> ,
        card.color = 'green'
      )
        : (
        card.string =`${change} (${percent}) %`,
        card.icon = <ArrowDownwardIcon /> ,
        card.color = 'red'
        )
    }

    const handleClick = (id) => {
      props.deleteStockFetch(id)
    }
    
    return (
      <Card className={classes.card}>
      {calculateChange()}
            <CardContent>
                <Typography className={classes.title} color="textPrimary" component="h3" align="center">
                    {props.stock.ticker.toUpperCase()}
                </Typography>
                <Typography align="center" variant="h4">
                    ${props.stock.todayPrice}
                </Typography>
                <Typography align="center" variant="h5">
                  {card.string}
                  {card.icon}
                </Typography>

                <CardActions>
                    <Button onClick={() => handleClick(props.stock.id)} color="primary">
                    Remove
                    </Button>
                    <Button onClick={() => props.handleSearch(props.stock.ticker)} color="primary" >
                      Show More
                    </Button>
                </CardActions>
                <Container className={classes[card.color]}>
                  <br></br>
                </Container>
            </CardContent>
        </Card>
    );
}


export default StockCard;