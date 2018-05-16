import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, AppBar, Toolbar,
         Typography, IconButton, Switch, 
         FormControlLabel, FormGroup, Menu, MenuItem, Button,
         ListItemIcon, ListItemText, Paper, Divider, Grid, InputAdornment,
         List, ListItem, ListSubheader, FormControl, Input, TextField, InputLabel } from 'material-ui';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import {NavLink, Link} from 'react-router-dom';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Collapse from 'material-ui/transitions/Collapse';
import classNames from 'classnames';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  root2: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  flex: {
    flex: 1,
  },
  primary: {},
  icon: {},
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  textField: {
    width: 185,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  button2: {
    color: "white",
  }

});

class DoctorNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      anchorEl: null,
      userName: "",
      password: "",
      showPassword: false,
    }; 
    // this.handleChange = this.handleChange.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.onChange = this.onChange.bind(this);
    this.loginDoc = this.loginDoc.bind(this);
  }

  // handleChange(event, checked)  {
  //   this.setState({ auth: checked });
  // };
  handleMouseDownPassword(event) {
    event.preventDefault();
  };

  handleClickShowPassword() {
    this.setState({ 
      showPassword: !this.state.showPassword 
    });
  };

  onChange(e){
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  handleMenu(event) {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose() {
    this.setState({ anchorEl: null });
  };

  loginDoc(){
    var that = this
    var obj = {
      userName: this.state.userName,
      password: this.state.password
    }
    $.ajax({
      url:'/Doctor/login',
      type:'POST',
      data:obj,
      success:function(data){
        that.setState({
          auth: true
        })
      },
      error:function(err){
        console.log(err);
      }
    });
  }

  componentDidMount() {
    var that = this
    $.ajax({
      url:'/Doctor/isLogin',
      type:'GET',
      success:function(data){
        that.setState({
          auth: true
        })
      },
      error:function(err){
        console.log(err);
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Doctor Panel
            </Typography>
            {auth && (
              <div>
                <Button component={Link} to="/doctor" className={classes.button2}>
                  Home
                </Button>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >                    
                  <MenuItem onClick={this.handleClose} component={Link} to="/doctor/patient">Patents</MenuItem>
                  <MenuItem onClick={this.handleClose} component={Link} to="/doctor/records">My account</MenuItem>
                  <Divider />
                </Menu>
              </div>
            )}
            {!auth && (
              <div>
                <TextField
                  required
                  id="username"
                  label="UserName"
                  placeholder="Enter username"
                  className={classes.textField}
                  margin="normal"
                  value={this.state.username}
                  name="userName"
                  onChange={this.onChange}
                />
                <FormControl className={classNames(classes.margin, classes.textField)}>
                  <InputLabel htmlFor="adornment-password">Password</InputLabel>
                  <Input
                    id="adornment-password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    name="password"
                    onChange={this.onChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.handleMouseDownPassword}
                        >
                          {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Button variant="raised" color="secondary" className={classes.button} onClick={this.loginDoc}>
                  Login
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

DoctorNavbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DoctorNavbar);