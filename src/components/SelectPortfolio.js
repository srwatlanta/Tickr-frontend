import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import RemoveIcon from '@material-ui/icons/Remove';
import Chip from '@material-ui/core/Chip';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
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
    text: {
        fontSize: "25px",
        marginRight: "12px"
    },
    chip: {
        borderColor: '#ffcc80',
    }
  }));

  
const SelectPortfolio = props => {
    const classes = useStyles();

    const handleDelete = (id) => {
        props.deletePortfolio(id)
    }

    const createInputs = () => {
        return props.portfolios.map(portfolio => {
            return <MenuItem value={portfolio}>
                        <Chip
                            icon={ShowChartIcon}
                            label={portfolio.name}
                            className={classes.chip}
                            onDelete={() => handleDelete(portfolio.id)}
                            variant="outlined"
                            size='medium'
                        />                    
                    </MenuItem>
        })
    }

    const handleChange = (event) => {   
        props.setCurrentPortfolio(event.target.value)
    }
        return (
            <div>
                <FormControl className={classes.formControl}>
                    <Select
                        value={props.currentPortfolio.name}
                        onChange={handleChange}
                        name="portfolio"
                        displayEmpty
                        className={classes.selectEmpty}
                        
                    >
                        <MenuItem style={classes.menuItem} value={props.currentPortfolio.name} disabled>
                            {props.currentPortfolio.name}
                        </MenuItem>
                            {createInputs()}
                    </Select>
                    <FormHelperText>Select Portfolio</FormHelperText>
                </FormControl>
            </div>
        );
    }


export default SelectPortfolio;