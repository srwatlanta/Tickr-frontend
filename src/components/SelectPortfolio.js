import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: "8px",
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: "16px",
    },
  };
  
class SelectPortfolio extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentPortfolio: this.props.currentPortfolio,
        }
    }



    createInputs = () => {
        return this.props.portfolios.map(portfolio => {
            return <MenuItem value={portfolio}>{portfolio.name}</MenuItem>
        })
    }

    handleChange = (event) => {   
        this.setState({
            currentPortfolio: event.target.value
        })
        this.props.setCurrentPortfolio(event.target.value)
    }

    render() {
        return (
            <div>
                <FormControl className={styles.formControl}>
                    <Select
                        value={this.state.currentPortfolio.name}
                        onChange={this.handleChange}
                        name="portfolio"
                        displayEmpty
                        className={styles.selectEmpty}
                    >
                        <MenuItem value={this.state.currentPortfolio.name} disabled>
                            {this.state.currentPortfolio.name}
                        </MenuItem>
                            {this.createInputs()}
                    </Select>
                    <FormHelperText>Select Portfolio</FormHelperText>
                </FormControl>
            </div>
        );
    }
}

export default SelectPortfolio;