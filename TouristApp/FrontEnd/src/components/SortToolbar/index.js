import React, { Component } from 'react';
import {
    Card,
    //CardTitle,
    //CardText,
    Form,
    CardBody,
    // CardSubtitle,
    // Row,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Col,
    Label,
    //Input,
    FormGroup
} from 'reactstrap';

class SortToolbar extends Component {
    state = {
        modal: true,
        dropdownOpen: false,
        dropDownValue: 'по імені від А до Я',
        // name: '',
        // surname: '',
        // phone: '',
        initialDate: "2019-01-01",
        lastDate: new Date(),
        sandFormSuccess: false,
        openModal: false,
        typeOfSort: 'default',
        sortByAscending: 'true',
        collapse: false,
        accordion: [true, false, false],
        custom: [true, false],
    };

    toggle = () => {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    sorting = (e) => {
        const { type, sort } = e.target.dataset;
        this.setState({ dropDownValue: e.currentTarget.textContent, typeOfSort: type, sortByAscending: sort });
    }

    callBackCloseDialog = () => {
        this.setState({ openModal: false });
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    toggle_colapse = () => {
        this.setState({ collapse: !this.state.collapse });
    }


    render() {
        console.log('--Sorting state----',this.state);
        return (
            <Card className="CardTours" >
                <CardBody>
                    <Form>
                        <FormGroup row>
                            <Label for="Select1" sm={2}>Сортування: </Label>
                            <Col sm={6}>

                                <Dropdown isOpen={this.state.dropdownOpen} toggle={() => { this.toggle(0); }} >
                                    <DropdownToggle caret style={{ backgroundColor: 'white' }}>
                                        {this.state.dropDownValue}
                                    </DropdownToggle>
                                    <DropdownMenu >
                                        <DropdownItem onClick={this.sorting} data-type="name" data-sort="true">
                                            по імені від А до Я
                                        </DropdownItem>
                                        <DropdownItem onClick={this.sorting} data-type="name" data-sort="false">
                                            по імені від Я до А
                                        </DropdownItem>
                                        <DropdownItem onClick={this.sorting} data-type="date" data-sort="true">
                                            по рейтингу ↑
                                        </DropdownItem>
                                        <DropdownItem onClick={this.sorting} data-type="date" data-sort="false">
                                            по рейтингу ↓
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </Col>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        );
    }
}

export default SortToolbar;

