import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//Recharts 
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';



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
    console.log(props)
    const classes = useStyles();
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
      }    
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} color="textPrimary" component="h1" >
                    {props.stock.ticker}
                </Typography>
                <Typography variant="h5" component="h2" color="textSecondary">
                Sector: {capitalize(props.stock.sector)}
                </Typography>
                <Typography>
                    $213.26
                </Typography>
                <Typography color="green">
                    1.26 (1.2%)
                </Typography>

                <CardActions>
                    <Button size="small" color="primary">
                    Remove
                    </Button>
                    <Button size="small" color="primary">
                    Learn More
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
    
}

export default StockCard;