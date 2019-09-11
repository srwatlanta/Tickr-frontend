import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PortfolioGraphChart from '../components/PortfolioGraphChart';
import StockCardContainer from './StockCardContainer'
import StockNews from '../components/StockNews'
import 'typeface-roboto';
import Container from '@material-ui/core/Container'

const styles = {
    bar: {
        backgroundColor: '#eee',
        color: 'white'
    },
    newsBox:{
        marginTop: "2%",
        maxWidth: "650px",
        
    },
    graphBox:{
        marginTop: "5%",
        
    },
    stockBox:{
        marginTop:"2%",
        marginLeft:"8%",
        maxWidth: "650px"
       
    },
    header:{
        backgroundColor: '#f2ab38'
    }

}



class ProfileContainer extends Component {
    constructor(){
        super()
        
    }
    
    render() {
        console.log(this.props)
        return (
            <Grid container style={styles.bar} spacing={2}>
                <Grid item xs={12} xl={12}>
                    <Grid container justify='center' style={styles.graphBox}>
                        <Grid item>
                            <Paper>
                                <PortfolioGraphChart username={this.props.username} portfolioName={this.props.portfolioName} stocks={this.props.stockGraphData} stockTickerData={this.props.stockCardData}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container justify='center' style={styles.stockBox}>
                        
                        <Paper style={styles.header}>
                            <Typography align="center" gutterBottom variant="h5">
                                Your Portfolio
                            </Typography>
                            <StockCardContainer deleteStockFetch={this.props.deleteStockFetch} handleSearch={this.props.handleSearch} stockCardData={this.props.stockCardData}/>
                        </Paper>
                        
                    </Grid>
                </Grid>

                <Grid item xs={6} >
                    <Grid container justify='center'  style={styles.newsBox}>
                        <Paper style={styles.header}>
                            <Typography align='center' gutterBottom variant="h5">
                                Top Business News
                            </Typography>
                            <StockNews news={this.props.topBusNews}/>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default ProfileContainer;