import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Button, CardBody, Card, FormGroup, Label, Input } from 'reactstrap';

const propTypes = {
    filterData: PropTypes.object.isRequired,
};

const defaultProps = {};


const FilterCheckBox = (props) => {
   // console.log('--FilterCheckBox props----', props);
    return (
         <FormGroup check className='align-text-bottom' >
            <Label check>
                <Input key={props.id} type="checkbox" onClick={props.handleCheckChieldElement} id={props.id} value={props.value} />{' '}<h5> {props.value} </h5>
            </Label>
        </FormGroup>)
}
const FilterHeader = (props) => {
    return (
        <Button
        color="info"
        onClick={props.onClick}
        className="mt-2 col">
        {props.name}{' ('}
        {props.data.length}{')'}
        {props.collapse ? <i className="fa fa-chevron-up float-right" aria-hidden="true" /> : <i className="fa fa-chevron-down float-right" aria-hidden="true" />}

    </Button>
    )
}

class FilterItem extends Component {
    state = {
        filter: {
            name: '',
            data: []
        },
        collapse: false
    }

    toggle = () => {
        this.setState({ collapse: !this.state.collapse })
    }

    componentDidMount() {
        this.setState({ filter: this.props.filterData });
    }

    handleCheckChieldElement = (event) => {

        const { handleCheckChieldElement = f => f } = this.props;
        let value = event.target.value;
        handleCheckChieldElement(value);
        // let value = event.target.value;
        // console.log('--value----', event.target.value);
        // let filter = this.state.filter;
        // filter.data.forEach(filter => {
        //     if (filter.value === event.target.value)
        //         filter.isChecked = event.target.checked
        // })
        // this.setState({ filter: filter }, () => handleCheckChieldElement(value));
    }

    render() {
        console.log('filterItem.pros:', this.props);
        //console.log('filterItem.state:', this.state);
        const { filter, collapse } = this.state;
        
        //console.log('filter:', filter);
        return (
            <div>
                <FilterHeader {...filter} collapse  onClick={this.toggle}/>
                 <Collapse isOpen={collapse}>
                    <Card>
                        <CardBody>
                            {filter.data.map(filterItem =><FilterCheckBox {...filterItem} key={filterItem.id} handleCheckChieldElement={this.handleCheckChieldElement} />)}
                        </CardBody>
                    </Card>
                </Collapse>
            </div>

        );
    }
}
FilterItem.propTypes = propTypes;
FilterItem.defaultProps = defaultProps;

export default FilterItem;
