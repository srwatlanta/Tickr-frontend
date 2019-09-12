import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
import SelectPortfolio from './SelectPortfolio';
import AddPortfolio from './AddPortfolio';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
    maxWidth: '60%',
    backgroundColor: "#fff3e0",
  },
  makeNew: {
    marginTop: '40px',
    marginBottom: '40px'
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
  
  const chartMore = (array) => {
    let portStocks = []
    array.forEach(stockData => portStocks.push(stockData))
    return formatStockInfoForGraph(portStocks)
  }

  const PortfolioGraphChart = (props) => {
    const classes = useStyles();
    const graphData = props.stocks.length > 1 ? chartMore(props.stocks) : props.stocks[0]
  
  return (
    props.stocks.length > 0 ?
      <Paper classdate={classes.root}>
        <Grid container>
        {/* <Typography variant="h3" component="h3" align="center">
            Welcome, {props.username}
        </Typography> */}
          <Grid item xs={4} align="center">
            <SelectPortfolio 
              currentPortfolio={props.currentPortfolio} 
              portfolios={props.portfolioOptions}
              setCurrentPortfolio={props.setCurrentPortfolio}
              deletePortfolio={props.deletePortfolio}
              
            />
          </Grid>
          <Grid item xs={4}>

          </Grid>
          <Grid item xs={4} align="right">
            <AddPortfolio handleAddPortfolio={props.handleAddPortfolio}/>
          </Grid>
          <Grid item xs={12}>
            <br />
            <LineChart  width={1500} height={600} data={graphData}
            margin={{ top: 5, right: 30, left: 80, bottom: 15 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" padding={{bottom: 50}} />
                <YAxis />
                <Tooltip />
                <Legend />
                {makeLines(props.stockTickerData)}
            </LineChart>
            <br/>
          </Grid>
        </Grid>
      </Paper>
      :
      <Paper classdate={classes.root}>

        <Grid container>
          <Grid item xs={6}>
            <SelectPortfolio 
              currentPortfolio={props.currentPortfolio} 
              portfolios={props.portfolioOptions}
              setCurrentPortfolio={props.setCurrentPortfolio}
              deletePortfolio={props.deletePortfolio}
            />
            
          </Grid>
          <Grid item xs={6} align="right" >
            <Grid container>
              <Grid item justify="center">
                <AddPortfolio handleAddPortfolio={props.handleAddPortfolio} className="addPortfolio"/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <LineChart width={1300} height={600}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {makeLines(props.stockTickerData)}
            </LineChart>
            <Typography className={classes.makeNew}variant="h4" component="h3" align="center">
                Please Add Stocks To This Portfolio
            </Typography>
          </Grid>
        </Grid>
      </Paper>

    
  );
}

export default PortfolioGraphChart;