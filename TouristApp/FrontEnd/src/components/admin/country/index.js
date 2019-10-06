import React, { Component } from 'react';
import {
    Label, Button, Modal, ModalHeader, ModalFooter, Card, CardBody, ModalBody,Form,
    Col, CardHeader, Table, Row, InputGroup, InputGroupAddon, InputGroupText, Input, FormGroup
} from 'reactstrap';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import get from 'lodash.get';
import classnames from 'classnames';
//import AdminService from '../AdminService'
import * as countryAction from '../../../reducers/countryReducer';
import { notify } from '../../Notifications'
//import Select from 'react-select';
const SpinnerWidget = React.lazy(() => import('../../CentrPageSpinner/index'));

const iconsColor = {
    backgroundColor: '#00aced',
    color: '#fff',
    borderColor: '#00aced'
}

class CountryForm extends Component {

    state = {
        countries: [],
        selectedCountry: null,
        errors: {
        },
        done: false,
        isLoading: false,
        deleteDialog_isOpen: false,
        id_delete: 0,
        editDialog_isOpen: false,
        id_edit: 0,
        id_edit_name: '',
        countryName: ''
    };



    setStateByErrors = (name, value) => {
        if (!!this.state.errors[name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[name];
            this.setState(
                {
                    [name]: value,
                    errors
                }
            )
        }
        else {
            this.setState(
                { [name]: value })
        }
    };

   
    componentDidMount() {
        console.log('---componentDiDMount----');
          this.props.getCountries();
        
    }

    handleChange = (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    };


    deleteCountry = (e, id) => {
        this.toggleDialogDelete();
        this.setState({ id_delete: id });
    }
    editCountry = (e, id, name) => {
        this.toggleDialogEdit();
        this.setState({ id_edit: id });
        this.setState({ id_edit_name: name });
    }

    toggleDialogDelete = () => {
        this.setState({
            deleteDialog_isOpen: !this.state.deleteDialog_isOpen
        });
    }

    toggleDialogEdit = () => {
        this.setState({
            editDialog_isOpen: !this.state.editDialog_isOpen
        });
    }

    onClickRemoveImageYes = () => {
        const { id_delete } = this.state;
        this.props.deleteCountry(id_delete);
        console.log('delete country with id:', id_delete);
        this.toggleDialogDelete();
    }

    onClickEditImageYes = () => {
        const { id_edit, id_edit_name } = this.state;
       var  model={
            Name:id_edit_name
        }
        this.props.editCountry(id_edit,model);
        console.log('edit country with id:', model);
        this.toggleDialogEdit();
    }

    
    onSubmitForm = e => {
        e.preventDefault();
        const { countryName } = this.state;
        let errors = {};
        console.log('submit');


        if (countryName === '') errors.countryName = "Виберіть країну!";

        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            

            this.setState({ isLoading: true });
            console.log('CountryAdd: validform', countryName);
           
            this.props.createCountry({Name:countryName});
            notify(" Країну додано!", '#071')
        }
        else {
            console.log('errors');
            this.setState({ errors });
            };
    };

    render() {
        console.log("--props CountryListPage---", this.props);
        console.log("--state CountryListPage---", this.state);
    
        const { isloading, deleteDialog_isOpen, id_delete, editDialog_isOpen, id_edit_name, errors } = this.state;

        const deleteDialogContent = (deleteDialog_isOpen &&
            <Modal isOpen={true} centered>
                <form >
                    <ModalHeader>Видалення</ModalHeader>
                    <ModalBody>
                        Ви дійсно хочете видалити країну з id: <b>{id_delete}</b>  ?
            </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onClickRemoveImageYes} className="btn btn-primary">Да</Button>
                        <Button color="danger" onClick={this.toggleDialogDelete} >Скасувати</Button>
                    </ModalFooter>
                </form>
            </Modal>
        );

        const editDialogContent = (editDialog_isOpen &&
            <Modal isOpen={true} centered>
                <form >
                    <ModalHeader>Редагування</ModalHeader>
                    <ModalBody>
                        <Label>Нова назва країни</Label>
                        <input className='form-control'
                            name="id_edit_name"
                            id="id_edit_name"
                            type="text"
                            value={id_edit_name}
                            onChange={this.handleChange} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onClickEditImageYes} className="btn btn-primary">Так</Button>
                        <Button color="danger" onClick={this.toggleDialogEdit} >Скасувати</Button>
                    </ModalFooter>
                </form>
            </Modal>
        );



        return (
            <div className="animated fadeIn">
                {deleteDialogContent}
                {editDialogContent}
                <SpinnerWidget loading={isloading} />
                <Row className="justify-content-center">

                    <Col xl={6}>
                        <Card>
                            <CardHeader><i className="fa fa-align-justify"></i>Менеджер країн</CardHeader>
                            <CardBody>
                             <Form onSubmit={this.onSubmitForm}>
                                <FormGroup row>
                                    <Col md="12">
                                        <InputGroup >
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText style={iconsColor}>
                                                    <i className="fa fa-globe" aria-hidden="true"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                                type="text"
                                                placeholder="назва країни"
                                                className={classnames('form-control', { 'is-invalid': !!errors.countryName })}
                                                id="countryName"
                                                name="countryName"
                                                value={this.state.countryName}
                                                onChange={this.handleChange}
                                            />
                                            <InputGroupAddon addonType="append">
                                                <Button type="submit"  style={iconsColor}><i className="fa fa-plus"></i></Button>
                                            </InputGroupAddon>
                                            {!!errors.countryName ? <span className="help-block">{errors.countryName}</span> : ''}

                                        </InputGroup>
                                    </Col>
                                </FormGroup>
                                </Form>   

                                <Table responsive hover striped>
                                    <thead>
                                        <tr>
                                            <th scope="col" className="d-none d-sm-block">Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Operations</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.props.list.map(country =>
                                            <tr key={country.value.toString()}>
                                                <td className="d-none d-sm-block">{country.value}</td>
                                                <td>{country.label}</td>
                                                <td>
                                                    <Button color="danger" size="sm" className="mr-2" onClick={e => this.deleteCountry(e, country.value)}><i className="fa fa-trash" aria-hidden="true" /></Button>
                                                    <Button color="primary" size="sm" onClick={e => this.editCountry(e, country.value, country.label)} ><i className="fa fa-pencil" aria-hidden="true" /></Button>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapState = state => {
    return {
      list: get(state, 'countries.list.data'),
      isListLoading: get(state, 'countries.list.loading'),
      isListError: get(state, 'countries.list.error'),
      isAddCountry: get(state, 'countries.add.success'),
    };
  };
  
  const mapDispatch = (dispatch) => {
    return {
        getCountries: () => {
        dispatch(countryAction.getCountries())
      },
      deleteCountry: (countryId) => {
        dispatch(countryAction.deleteCountry(countryId))
      },
      editCountry: (id,model) => {
        dispatch(countryAction.editCountry(id,model))
      },
      createCountry: (model) => {
        dispatch(countryAction.createCountry(model))
      }
  
    };
  };

const  CountryWidget = connect(mapState, mapDispatch)(CountryForm);
export default CountryWidget;