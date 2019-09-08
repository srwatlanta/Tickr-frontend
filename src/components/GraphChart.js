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
  },
}));

const data = [
    {"name": "9/1",
     "pv": 210
    },
    {"name": "9/2",
     "pv": 215
    },
    {"name": "9/3",
     "pv": 220
    },
    {"name": "9/4",
     "pv": 190
    },
    {"name": "9/5",
     "pv": 160
    },
    {"name": "9/6",
     "pv": 140
    },
    {"name": "9/7",
     "pv": 175
    },
    {"name": "9/8",
     "pv": 190
    },
    {"name": "9/9",
     "pv": 210
    },
    {"name": "9/10",
    "pv": 185
    }
]


const GraphChart = () => {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h3">
          AAPL
        </Typography>
        <Typography component="p">
          Sector: Technology
        </Typography>
        <LineChart width={730} height={250} data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      </Paper>
    </div>
  );
}

export default GraphChart;