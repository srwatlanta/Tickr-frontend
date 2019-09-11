import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import SelectPortfolio from './SelectPortfolio';


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    maxWidth: 1000,
    backgroundColor: "#fff3e0",
  },
}));

const styles = {
  button: {
    backgroundColor: '#fb8c00',
    marginLeft: '2%'
  }
}

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  

const makeLines = (array) => {
    return array.map(stock => {
        let color = getRandomColor()
        return <Line type="monotone" dataKey={stock.ticker} stroke={color} />
    })
}

const formatStockInfoForGraph = (allStocks) => {
    let newobj = []       
    for(let i = 0, y=1; y < allStocks.length; y++){
      let n = allStocks[i].map( point => {
        let temp = []
        allStocks[y].map( nextLine => {
          if (point.date === nextLine.date) {
            temp.push(nextLine)
          }
        })
        let stock2name = Object.entries(temp[0]).slice(0,2)[1][0]
        let stock2value = Object.entries(temp[0]).slice(0,2)[1][1]
        point[stock2name] =  stock2value
        newobj.push(point)
      })
    }
    let firstTenObj = newobj.slice(0,10)
    return firstTenObj
  }
  
  const PortfolioGraphChart = (props) => {
    const classes = useStyles();
    let portStocks = []
    props.stocks.forEach(stockData => portStocks.push(stockData))
    let graphData = formatStockInfoForGraph(portStocks)
    let username = props.user.username
    return (
      <div>
        <Paper classdate={classes.root}>
          <Typography variant="h5" component="h3">
            {username}
          </Typography>
          <Typography variant="h5" component="h3">
              <SelectPortfolio 
                portfolioId={props.portfolioId}
                handlePortfolioChange={props.handlePortfolioChange}
                portfolios={props.user.portfolios}
              />
          </Typography>
          <Typography component="p">
              
          </Typography>
          <LineChart width={730} height={400} data={graphData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {makeLines(props.stockTickerData)}
          </LineChart>
        </Paper>
      </div>
    );
  }

export default PortfolioGraphChart;