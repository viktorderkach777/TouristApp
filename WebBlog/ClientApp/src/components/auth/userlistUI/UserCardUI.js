
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import UserRoles from  './UserRoles';
import IconButton from '@material-ui/core/IconButton';
import { connect } from 'react-redux';
import { deleteUser } from "../../../actions/userActions";
import ModalWindow from '../../modal/simplymodal';



const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
     
  },
});


 class UserCardUI extends Component {
  
  state = {
    isOpen: false,
  }

  openModal = () => {
    this.setState({ isOpen: true });
  }

  handleSubmit = () => {
    console.log('Submit function!');
    
    this.props.deleteUser(this.props.user.id)
    this.setState({ isOpen: false });
  }

  handleCancel = () => {
    console.log('Cancel function!');
    this.setState({ isOpen: false });
  }


  
    render(){
        const { classes,user } = this.props;
        console.log("--user in props--", this.props);
         

  return (
    
      <Paper className={classes.paper}>
        <Grid container spacing={16}>
          <Grid item>
            <ButtonBase className={classes.image}>
            <img className={classes.img} alt="complex" src={user.userImage} />
                 
            </ButtonBase>
          </Grid>
          <Grid>
          
        
        <ModalWindow
          title="Delete user disalog"
          isOpen={this.state.isOpen}
          onCancel={this.handleCancel}
          onSubmit={this.handleSubmit}
        >
        <p>this is text</p>
        </ModalWindow>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                 {user.fullName}
                </Typography>
                <Typography gutterBottom>Email: {user.email}</Typography>
                <Typography> Roles:
                {user.roles.map(item => (
                 <UserRoles role={item} key={item.id} />
                ))}
                </Typography> 
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">  
              <IconButton aria-label="Delete" onClick={this.openModal}>
              <i className="fas fa-trash-alt"></i>
                      </IconButton> 
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        
      </Paper>
    
  );
  }
}

UserCardUI.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  deleteUser:PropTypes.func.isRequired

};
// <IconButton aria-label="Delete" onClick={() => this.props.deleteUser(user.id)}>
//export default withStyles(styles)(UserCardUI);

export default connect (null,{deleteUser})(withStyles(styles)(UserCardUI));