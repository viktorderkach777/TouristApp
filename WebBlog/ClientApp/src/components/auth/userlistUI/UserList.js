import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import UserCardUI from "./UserCardUI";
import Grid from '@material-ui/core/Grid';



const styles = theme => ({
    root: {
      flexGrow: 1,
      margin:10
    },
    paper: {
      padding: theme.spacing.unit,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  });

class UserList extends Component {
  state = {};
  
  render() {
    
    console.log("--USerList props--", this.props);
    const { users, classes} = this.props;
    const emptyMessage = <p>Список пустий</p>;
    const usersList = (
        <div className={classes.root}>
        <Grid container spacing={40}>
        <Grid item xs={10} md={6}>
        {users.map(item => (
          <UserCardUI user={item} key={item.id} />
        ))}
        </Grid>
      </Grid>
      </div>
    );
    return <div>{users.length === 0 ? emptyMessage : usersList}</div>;
  }
}

UserList.propTypes = {
  users: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired

};

export default withStyles(styles)(UserList);