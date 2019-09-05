import React, { Component } from 'react';
import {   
    Row,    
    //Button
} from 'reactstrap';
import { connect } from 'react-redux';
import { regionLoaded } from '../../actions';

class Buttons extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    buttonClick = (e) => {
        console.log("e", e.target.value);
        this.props.dispatch(regionLoaded(e.target.value));
    }

    render() { 
        return ( 
            <Row>
            <button value="Lutsk" onClick={(e)=>this.buttonClick(e)}>Lutsk</button>
            <button value="Rivne" onClick={(e)=>this.buttonClick(e)}>Rivne</button>
        </Row>
         );
    }
}
 
export default  connect()(Buttons);