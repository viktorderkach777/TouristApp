import React, { Component } from 'react';
import { CardHeader, FormFeedback, Col, Card, CardBody, CardFooter, CardGroup, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { kursGet } from './reducer';
import CentrPageSpinner from '../../CentrPageSpinner';
import ErrorBoundry from '../../errorBoundry';


class ConverterPrivatBank extends Component {
    state = {
        kurs: [],
        grn: '',
        usd: '',
        eur: '',
        rur: '',
        errors: {},
        loading: false
    };

    componentDidMount() {
        this.props.kursGet();
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        this.setState({
            loading: nextProps.loading,
            errors: nextProps.errors,
            kurs: nextProps.kurs
        });
    }

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

    handleChange = (e) => {
        this.setStateByErrors(e.target.name, e.target.value);
    };

    changeKurs = (e, type) => {
        e.preventDefault();
        const { kurs, errors } = this.state;
        if (kurs.length === 0) {
            errors.serverError = "Server error";
            this.setState({ errors });
            return;
        }
        const usdSale = parseFloat(kurs[0].sale);
        const eurSale = parseFloat(kurs[1].sale);
        const rurSale = parseFloat(kurs[2].sale);
        //console.log('usdSale, eurSale, rurSale', usdSale, eurSale, rurSale);

        switch (type) {

            case 'grn':
                this.setState({
                    grn: e.target.value,
                    rur: isNaN(e.target.value) ? '0' : (e.target.value / rurSale).toFixed(2),
                    usd: isNaN(e.target.value) ? '0' : (e.target.value / usdSale).toFixed(2),
                    eur: isNaN(e.target.value) ? '0' : (e.target.value / eurSale).toFixed(2)
                });
                break;
            case 'rur':
                this.setState({
                    rur: e.target.value,
                    grn: isNaN(e.target.value) ? '0' : (e.target.value * rurSale).toFixed(2),
                    usd: isNaN(e.target.value) ? '0' : (e.target.value * rurSale / usdSale).toFixed(2),
                    eur: isNaN(e.target.value) ? '0' : (e.target.value * rurSale / eurSale).toFixed(2)
                });

                break;
            case 'usd':
                this.setState({
                    usd: e.target.value,
                    grn: isNaN(e.target.value) ? '0' : (e.target.value * usdSale).toFixed(2),
                    rur: isNaN(e.target.value) ? '0' : (e.target.value * usdSale / rurSale).toFixed(2),
                    eur: isNaN(e.target.value) ? '0' : (e.target.value * usdSale / eurSale).toFixed(2)
                });
                break;
            case 'eur':
                this.setState({
                    eur: e.target.value,
                    grn: isNaN(e.target.value) ? '0' : (e.target.value * eurSale).toFixed(2),
                    rur: isNaN(e.target.value) ? '0' : (e.target.value * eurSale / rurSale).toFixed(2),
                    usd: isNaN(e.target.value) ? '0' : (e.target.value * eurSale / usdSale).toFixed(2)
                });
                break;
            default:
                break;
        }
    }

    // onSubmitForm = (e) => {
    //     e.preventDefault();
    //     let errors = {};
    //     console.log('submit');

    //     const isValid = Object.keys(errors).length === 0
    //     if (isValid) {

    //         AdminService.getKurs()
    //             .then(res => {
    //                 const kurs = res.data.answer;
    //                 this.setState({ kurs, done: true, isLoading: false })
    //             })
    //             .catch(() => { console.log('--failed--'); });
    //     }
    //     else {
    //         this.setState({ errors });
    //     }
    // };

    render() {
        const { loading, errors, grn, rur, usd, eur } = this.state;

        if (loading) {
            return <CentrPageSpinner loading={loading} />
        }

        return (
            <React.Fragment>                
                    <ErrorBoundry>
                        <div className="app flex-row align-items-center">
                            <Container>
                                <Row className="justify-content-center">
                                    <Col md="8">
                                        <CardGroup>
                                            <Card className="p-4">
                                                <CardHeader>
                                                    <i className="fa fa-align-justify"></i>
                                                    Конвертер валют
                                        </CardHeader>
                                                <CardBody>
                                                    {!!errors.serverError ?
                                                        <div className="invalid-feedback d-block">
                                                            {errors.serverError}
                                                        </div> : ''}
                                                    <InputGroup className="mb-3">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i>ГРН</i>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            className="form-control"
                                                            invalid={!!errors.grn}
                                                            type="number"
                                                            value={grn}
                                                            name="grn"
                                                            id="grn"
                                                            placeholder=" "
                                                            onChange={e => this.changeKurs(e, 'grn')}
                                                        />
                                                        <FormFeedback>{errors.grn}</FormFeedback>
                                                    </InputGroup>

                                                    <InputGroup className="mb-4">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i>RUB</i>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            className="form-control"
                                                            invalid={!!errors.rub}
                                                            type="number"
                                                            value={rur}
                                                            name="rub"
                                                            id="rub"
                                                            placeholder=" "
                                                            onChange={e => this.changeKurs(e, 'rur')}
                                                        />
                                                        <FormFeedback>{errors.rub}</FormFeedback>
                                                    </InputGroup>

                                                    <InputGroup className="mb-4">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i>USD</i>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            className="form-control"
                                                            invalid={!!errors.usd}
                                                            type="number"
                                                            value={usd}
                                                            name="usd"
                                                            id="usd"
                                                            placeholder=" "
                                                            onChange={e => this.changeKurs(e, 'usd')}
                                                        />
                                                        <FormFeedback>{errors.usd}</FormFeedback>
                                                    </InputGroup>

                                                    <InputGroup className="mb-4">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i>EUR</i>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            className="form-control"
                                                            invalid={!!errors.eur}
                                                            type="number"
                                                            value={eur}
                                                            name="eur"
                                                            id="eur"
                                                            placeholder=" "
                                                            onChange={e => this.changeKurs(e, 'eur')}
                                                        />
                                                        <FormFeedback>{errors.eur}</FormFeedback>
                                                    </InputGroup>

                                                </CardBody>
                                                <CardFooter className="p-4">
                                                </CardFooter>
                                            </Card>
                                        </CardGroup>
                                    </Col>
                                </Row>
                            </Container>
                        </div>                
                </ErrorBoundry>
            </React.Fragment>
        )
    }
}

const mapState = (state) => {
    return {
        loading: state.kurs.loading,
        errors: state.kurs.errors,
        kurs: state.kurs.kurs
    }
}

const mapDispatch = (dispatch) => {
    return {
        kursGet: () =>
            dispatch(kursGet()),
    };
}

ConverterPrivatBank.propTypes =
    {
        kursGet: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        kurs: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired
    }

export default connect(mapState, mapDispatch)(ConverterPrivatBank);
