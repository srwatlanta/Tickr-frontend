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


const StockCard = () => {
    const classes = useStyles();
    const data = [{name: '9/2/19', uv: 300, pv: 250, amt: 2400},{name: '9/3/19', uv: 400, pv: 270, amt: 2400},{name: '9/4/19', uv: 275, pv: 300, amt: 2400},{name: '9/5/19', uv: 310, pv: 250, amt: 2400},{name: '9/6/19', uv: 330, pv: 320, amt: 2400},{name: '9/7/19', uv: 290, pv: 290, amt: 2400},{name: '9/8/19', uv: 270, pv: 200, amt: 2400},{name: '9/9/19', uv: 250, pv: 240, amt: 2400}];

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography className={classes.title} color="textPrimary" component="h1" >
                    AAPL
                </Typography>
                <Typography variant="h5" component="h2" color="textSecondary">
                Sector: Technology
                </Typography>
                <Typography>
                    $213.26
                </Typography>
                <Typography color="green">
                    1.26 (1.2%)
                </Typography>
                <LineChart width={200} height={100} data={data}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                    <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                </LineChart>
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