import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';


class SelectPortfolio extends Component {
    constructor(){
        super()
        this.state = {
            portfolioName: this.props.portfolioName,
            portfolioId: this.props.portfolioId
        }
    }
    render() {
        return (
            <div>
                <FormControl>
                    <InputLabel htmlFor="select-portfolio">Portfolio</InputLabel>
                    <Select
                        value={this.state.portfolioId}
                        onChange={this.props.handleportfolioChange}
                        inputProps={{
                        name: 'Portfolio',
                        id: 'portfolio-id',
                        }}
                        >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                 </FormControl>
                
            </div>
        );
    }
}

export default SelectPortfolio;