import React from 'react';
import {PieChart, Pie, Sector, Cell }from 'recharts';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
      maxWidth: 500,
      height: 400,
    },
  }));


const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const SectorPieChart = () => {
    const classes = useStyles()
    return (
        
        <Paper className={classes.root}>
            <Typography>
                This is a Pie Chart
            </Typography>
            <PieChart width={500} height={500}>
                <Pie
                    data={data}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={"hi"}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
            </PieChart>
        </Paper>
        
    );
}

export default SectorPieChart;