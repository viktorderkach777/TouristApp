import React, { Component } from 'react';
import {
    Card,
    //CardTitle,
    //CardText,
    Form,
    CardBody,
    // CardSubtitle,
   // Row,
    Col,
    Label,
    Input,
    FormGroup
} from 'reactstrap';
class SortToolbar extends Component {
    state = {}
    render() {
        return (
            <Card className="CardTours" >
                <CardBody>
                    {/* <div class="holder">
                        <h2>Custom Select</h2>
                        <form action="#" class="customSelect">
                            <div class="row">
                                <p>Please select the payment method.</p>
                            </div>
                            <div class="row">
                                <div class="select">
                                    <select>
                                    <option>по імені від А до Я</option>
                                    <option>по імені від Я до А</option>
                                    <option>по рейтингу ↑</option>
                                    <option>по рейтингу ↓</option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div> */}

                <Form>
                    <FormGroup row>
                        <Label for="Select1" sm={2}>Сортування: </Label>
                        <Col sm={4}>
                            <Input type="select" name="select" className="select11" id="Select1">
                                <option>по імені від А до Я</option>
                                <option>по імені від Я до А</option>
                                <option>по рейтингу ↑</option>
                                <option>по рейтингу ↓</option>
                            </Input>
                        </Col>
                    </FormGroup>
                </Form>
                </CardBody>
            </Card>
        );
    }
}
export default SortToolbar;

