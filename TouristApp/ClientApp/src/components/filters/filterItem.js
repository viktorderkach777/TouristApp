import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Button, CardBody, Card, FormGroup, Label, Input } from 'reactstrap';

const propTypes = {

    filterData: PropTypes.object.isRequired,
    handleCheckChieldElement: PropTypes.func.isRequired
};

const defaultProps = {};


const FilterCheckBox = (props) => {
    // console.log('--FilterCheckBox props----', props);
    return (
        // <FormGroup check className='align-text-bottom custom-control custom-checkbox' >
        //     <Label check className="custom-control-label" for={props.id}>
        //         <Input key={props.id}
        //                checked = {props.isChecked}
        //                type="checkbox"
        //                className="custom-control-input"
        //                onChange={props.handleCheckChieldElement}
        //                id={props.id}
        //                value={props.value} />
        //                {' '}
        //                <h5> {props.value} </h5>
        //     </Label>
        // </FormGroup>
        <div class="form-group my-1">
        <div className="custom-control custom-checkbox">
            <input
            key={props.id}
            type="checkbox"
            className="custom-control-input "
            onChange={props.handleCheckChieldElement}
            id={props.id}
            value={props.value}
            />
            <label className="custom-control-label" for={props.id}>
            {' '} 
            {props.value}
            </label>
        </div>
    </div>
    )}
const FilterHeader = (props) => {
    return (
        <Button
            color="info"
            onClick={props.toggle}
            className="mt-2 col">
            {props.name}{' ('}
            {props.children.length}{')'}
            {props.collapse ? <i className="fa fa-chevron-up float-right" aria-hidden="true" /> : <i className="fa fa-chevron-down float-right" aria-hidden="true" />}

        </Button>
    )
}

class FilterItem extends Component {
    state = {
        collapse: false
    }

    toggle = () => {
        this.setState({ collapse: !this.state.collapse })
    }

    componentDidMount() {
        this.setState({ filter: this.props.filterData,collapse:this.props.filterData.isCollapsed});
    }

    handleCheckChieldElement = (event) => {
        const { handleCheckChieldElement = f => f } = this.props;
        let filterId = event.target.id;
        handleCheckChieldElement(filterId);
    }

    static getDerivedStateFromProps = (props, state) => {
        //console.log('---getDerivedStateFromProps filter---');
        return {
            filter: props.filterData
        };
    }

    render() {
        //console.log('filterItem.state:', this.state);
        //console.log('filterItem.props:', this.props);
        const { collapse} = this.state;
        const { filterData } = this.props;
        let filter = filterData.children;
        return (
            <div>
                <FilterHeader {...filterData} collapse={collapse} toggle={this.toggle} />
                <Collapse isOpen={collapse}>
                    <Card>
                        <CardBody>
                            {filter.length !== 0 ? (filter.map(filterItem => <FilterCheckBox {...filterItem} key={filterItem.id} handleCheckChieldElement={this.handleCheckChieldElement} />)) : ('')}
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
