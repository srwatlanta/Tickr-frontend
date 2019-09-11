import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import PortfolioGraphChart from '../components/PortfolioGraphChart';
import StockCardContainer from './StockCardContainer'


const styles = {
    bar: {
        backgroundColor: '#ba68c8',
        color: 'white'
    }
}

const stockAPIKEY = 'CH447Y09NPSTFX3A'
const newsAPIKEY = '85216af2d9e046409f238846c9947b25'



class ProfileContainer extends Component {
    constructor(){
        super()
        
    }

    
    
    render() {
        
        return (
            <Grid container>
                <Grid item xs={12}>
                    <Grid container justify='center'>
                        <Grid item>
                            <Paper>
                                {/* <PortfolioGraphChart 
                                stocks={this.props.stockGraphData} 
                                user={this.props.user}
                                /> */}
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container justify='center'>
                        <Paper>
                            <Typography>
                                <StockCardContainer deleteStockFetch={this.props.deleteStockFetch} handleSearch={this.props.handleSearch} stockCardData={this.props.stockCardData}/>
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid item xs={6}>
                    <Grid container justify='center'>
                    <Paper>
                        <Typography>
                            Hello
                            <br></br>
                            Hello
                            <br/>
                            Hello
                            <br/>
                            Hello
                            <br/>
                            Hello

                        </Typography>
                    </Paper>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default ProfileContainer;