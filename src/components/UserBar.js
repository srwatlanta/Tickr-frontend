import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import MenuIcon from '@material-ui/icons/Menu';




const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
});

export default function UserBar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
  });

  const toggleDrawer = (side, open) => event => {
    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
    >
      <List>
        <ListItem image>
            <Avatar alt="Remy Sharp" src="https://images-na.ssl-images-amazon.com/images/I/41dM6tFDFUL.jpg" className={classes.bigAvatar} />
        </ListItem>
        <ListItem>
            <ListItemIcon><PersonIcon/></ListItemIcon>
            <ListItemText primary='John Jeffries' />
        </ListItem>
        <ListItem>
            <ListItemIcon><EmailIcon/></ListItemIcon>
            <ListItemText primary='jj@gmail.com' />
        </ListItem>
        <ListItem>
            <ListItemIcon><CalendarTodayIcon/></ListItemIcon>
            <ListItemText primary='Member Since: 2015' />
        </ListItem>
      </List>
      <Divider/>
      <List>
        < ListItem button>
            <ListItemIcon><ShowChartIcon/></ListItemIcon>
            <ListItemText primary='Profile' />
        </ListItem>      
      </List>

    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer('open', true)}><MenuIcon/></Button>

      <Drawer open={state.open} onClose={toggleDrawer('open', false)}>
        {sideList('open')}
      </Drawer>
    </div>
  );
}
