import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';





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
});


const StockCard = (props) => {
    const classes = useStyles();
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }    

    const calculateChange = () => {
      let change = Number(Math.round((props.stock.todayPrice - props.stock.yesterdayPrice) + 'e2') + 'e-2')
      let percent = Number(Math.round(((props.stock.todayPrice / props.stock.yesterdayPrice) - 1) + 'e2') + 'e-2')
      return change > 0 ? `+${change} (${percent}) %` : `${change} (${percent}) %`
    }


    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} color="textPrimary" component="h1" >
                    {props.stock.ticker.toUpperCase()}
                </Typography>
                <Typography>
                    {props.stock.todayPrice}
                </Typography>
                <Typography color="green">
                    {calculateChange()}
                </Typography>

                <CardActions>
                    <Button onClick={() => props.deleteStockFetch(props.stock.id)} size="small" color="primary">
                    Remove
                    </Button>
                    <Button onClick={() => props.handleSearch(props.stock.ticker)} >
                      Show More
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
    
}

export default StockCard;