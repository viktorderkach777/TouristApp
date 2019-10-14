import React, { Component } from 'react';
import { Label, CardHeader, FormGroup, Card, CardBody,  Col,  Form, Input,  Row } from 'reactstrap';
import AdminService from '../../../Services/AdminService'

class KursForm extends Component {

    state = {
        kurs: [],
        grn:'',
        usd:'',
        eur:'',
        rur:'',
        currentDate: '',
        errors: {
        },
        done: false,
        isLoading: false
    };

    componentDidMount() {
        console.log('---componentDiDMount----');
        AdminService.getKurs()
                .then(res => {
                    const kurs = res.data.answer;
                    this.setState({ kurs, done: true, isLoading: false })
                })
                .catch(() => { console.log('--failed--'); });
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

    changeKurs = (e,type) => {
        e.preventDefault();
 
       const {kurs}=this.state;
        switch (type) {

            case 'grn':
             this.setState({
                grn: e.target.value,
                rur:isNaN(e.target.value)?'0':(e.target.value/kurs.rur).toFixed(2),
                usd:isNaN(e.target.value)?'0':(e.target.value/kurs.usd).toFixed(2),
                eur:isNaN(e.target.value)?'0':(e.target.value/kurs.eur).toFixed(2)
             });
               break;
            case 'rur':
                    this.setState({
                        rur: e.target.value,
                        grn:isNaN(e.target.value)?'0':(e.target.value*kurs.rur).toFixed(2),
                        usd:isNaN(e.target.value)?'0':(e.target.value*kurs.rur/kurs.usd).toFixed(2),
                        eur:isNaN(e.target.value)?'0':(e.target.value*kurs.rur/kurs.eur).toFixed(2)
                     });
             
              break;
            case 'usd':
                    this.setState({
                        usd: e.target.value,
                        grn:isNaN(e.target.value)?'0':(e.target.value*kurs.usd).toFixed(2),
                        rur:isNaN(e.target.value)?'0':(e.target.value*kurs.usd/kurs.rur).toFixed(2),
                        eur:isNaN(e.target.value)?'0':(e.target.value*kurs.usd/kurs.eur).toFixed(2)
                     });
              break;
            case 'eur':
                    this.setState({
                        eur: e.target.value,
                        grn:isNaN(e.target.value)?'0':(e.target.value*kurs.eur).toFixed(2),
                        rur:isNaN(e.target.value)?'0':(e.target.value*kurs.eur/kurs.rur).toFixed(2),
                        usd:isNaN(e.target.value)?'0':(e.target.value*kurs.eur/kurs.usd).toFixed(2)
                     });
              break;
            default:
     
          }
        
    }

    onSubmitForm = (e) => {
        e.preventDefault();
        let errors = {};
        console.log('submit');
        
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            
            AdminService.getKurs()
                .then(res => {
                    const kurs = res.data.answer;
                    this.setState({ kurs, done: true, isLoading: false })
                })
                .catch(() => { console.log('--failed--'); });
        }
        else {
            this.setState({ errors });
        }
    };

    render() {
        const { kurs,grn,rur,usd,eur } = this.state;
        console.log('----Курси валют---', this.state);
        const form = (
            <React.Fragment>
                <Row className="justify-content-center">
                    <Col md="5">
                        <Card>
                            <CardHeader><i className="fa fa-align-justify"></i>Конвертер валют</CardHeader>
                            <CardBody>
                                <Form inline  onSubmit={this.onSubmitForm}>
                                    <FormGroup className="m-2 mr-sm-2 mb-sm-0">
                                        <Label for="grn" className="mr-sm-2">ГРН</Label>
                                        <Input type="number" value={grn} name="grn" id="grn" placeholder=" "  onChange={e => this.changeKurs(e,'grn')} />
                                    </FormGroup>
                                    <FormGroup className="m-2 mr-sm-2 mb-sm-0">
                                        <Label for="rub" className="mr-sm-2">RUB</Label>
                                        <Label for="rub" className="mr-sm-2">{kurs.rur}</Label>
                                        <Input type="number"  value={rur} name="rub" id="rub" placeholder=" "  onChange={e => this.changeKurs(e,'rur')} />
                                    </FormGroup>
                                    <FormGroup className="m-2 mr-sm-2 mb-sm-0">
                                        <Label for="usd" className="mr-sm-2">USD</Label>
                                        <Label for="usd" className="mr-sm-2">{kurs.usd}</Label>
                                        <Input style={{width:'55%'}} type="number" value={usd} name="usd" id="usd" placeholder=" " onChange={e => this.changeKurs(e,'usd')} />
                                    </FormGroup>
                                    <FormGroup className="m-2 mr-sm-2 mb-sm-0 justify-content-left" >
                                        <Label for="eur" className="mr-sm-2">EUR</Label>
                                        <Label for="eur" className="mr-sm-2">{kurs.eur}</Label>
                                        <Input style={{width:'55%'}} type="number" value={eur} name="eur" id="eur" placeholder=" "  onChange={e => this.changeKurs(e,'eur')}/>
                                    </FormGroup>
                                    {/* <Button color ='primary' type="submit" >Submit</Button> */}
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </React.Fragment>
        );
        return form;
    }
}

const KursWidget = KursForm;
export default KursWidget;

