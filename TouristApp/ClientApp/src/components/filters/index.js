import React, { Component } from 'react';
import FilterItem from './filterItem';
import { Button, Form, Card, CardHeader, CardBody, Row,Col } from 'reactstrap';


class Filters extends Component {
    constructor(props) {
        super(props);

        //initializing state 
        this.state = {
            filters: !this.props.filters ? "" : this.props.filters,
        };
    }


    handleCheckChieldElement = (value) => {

        const { handleCheckChieldElement = f => f } = this.props;
        handleCheckChieldElement(value);
        // console.log('---value enter---',value)
        //let filters = this.state.filters;
        // filters.forEach(filter => {
        //     filter.data.forEach(data=>{
        //         if (data.value === value) {
        //             console.log('---isChecked---',data.isChecked )   
        //            // data.isChecked = !data.isChecked

        //         }
        //     })     
        // })
        // this.setState({ filters: filters })

    }

    render() {
        const { filters } = this.state;
        console.log('---MAIN:filters---', filters)
        return (
            <Form>
                <Card className="CardTours">
                    <CardBody>
                        <CardHeader>217 знайдено</CardHeader>
                        {filters.map(filterItem =>
                            <FilterItem filterData={filterItem} key={filterItem.filterId} handleCheckChieldElement={this.handleCheckChieldElement} />
                        )}
                        <Row >
                            <Col  className="d-flex justify-content-center">
                                <Button className='mt-2 buttonHotel' >Знайти</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

            </Form>
        );
    }
}

export default Filters;