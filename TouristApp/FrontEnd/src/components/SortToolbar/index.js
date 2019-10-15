import React, { Component } from 'react';
import {
    Card,
    Form,
    CardBody,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    FormGroup,
    InputGroup,
    Button,
    InputGroupAddon
} from 'reactstrap';

class SortToolbar extends Component {
    state = {
        modal: true,
        dropdownOpen: false,
        dropDownValue: 'по імені від А до Я',
        sandFormSuccess: false,
        openModal: false,
        sortOrder: 'name',
        findOrder: '',
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
        const { onSortChanged = f => f } = this.props;
        const { findOrder  } = this.state;
        const { type } = e.target.dataset;
        this.setState({ dropDownValue: e.currentTarget.textContent, sortOrder: type }, () => onSortChanged(type,findOrder));

    }

    onSearchclick=()=>{
        const { onSortChanged = f => f } = this.props;
        const { findOrder,sortOrder  } = this.state;
        onSortChanged(sortOrder,findOrder)
      //  this.sorting();
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
        console.log('--Sorting state----', this.state);
        const { findOrder } = this.state;
        return (
            <Card className="CardTours" >
                <CardBody>

                    <Form  className="ml-2">

                        <FormGroup className="row">
                            <div className="col-12 col-md-6 mb-2 ">
                                <InputGroup >
                                    <InputGroupAddon addonType="prepend">
                                        <Button type="text" color="primary"><i className="fa fa-sort" aria-hidden="true"></i></Button>
                                    </InputGroupAddon>
                                    <Dropdown isOpen={this.state.dropdownOpen} toggle={() => { this.toggle(0); }} >
                                        <DropdownToggle caret style={{ backgroundColor: 'white' }}>
                                            {this.state.dropDownValue}
                                        </DropdownToggle>
                                        <DropdownMenu >
                                            <DropdownItem onClick={this.sorting} data-type="name" >
                                                по імені від А до Я
                                        </DropdownItem>
                                            <DropdownItem onClick={this.sorting} data-type="name_desc">
                                                по імені від Я до А
                                        </DropdownItem>
                                            <DropdownItem onClick={this.sorting} data-type="rate">
                                                по рейтингу ↑
                                        </DropdownItem>
                                            <DropdownItem onClick={this.sorting} data-type="rate_desc">
                                                по рейтингу ↓
                                        </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </InputGroup>
                            </div>
                            <div className="col-12 col-md-6  mb-2">
                                <InputGroup >
                                    <InputGroupAddon addonType="prepend">
                                        <Button type="text" color="primary"><i className="fa fa-search" aria-hidden="true"></i></Button>
                                    </InputGroupAddon>
                                    <Input type="text" value={findOrder} name="findOrder" id="findOrder" placeholder=" Я шукаю ... " onChange={this.handleChange} />
                                    <InputGroupAddon addonType="append">
                                        <Button type="button" color="primary" onClick={this.onSearchclick}> Знайти </Button>
                                    </InputGroupAddon>
                                </InputGroup>
                            </div>
                        </FormGroup>
                    </Form>
                </CardBody>
            </Card>
        );
    }
}

export default SortToolbar;

