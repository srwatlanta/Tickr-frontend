import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    maxWidth: 1000,
    backgroundColor: "#fff3e0",
  },
}));



let ticker

const GraphChart = (props) => {
  const classes = useStyles();
  ticker = props.stockInfo
  console.log(props)
  return (
    <div>
      <Paper classdate={classes.root}>
        <Typography variant="h5" component="h3">
          {props.stockName}
        </Typography>
        <Typography component="p">
          Sector: Technology
        </Typography>
        <LineChart width={730} height={400} data={props.stockInfo}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey={props.stockName} stroke="#8884d8" />
            
        </LineChart>
      </Paper>
    </div>
  );
}

export default GraphChart;