import React, { Component } from 'react';
import FilterItem from './filterItem';
import { Button, Form, Card, CardHeader, CardBody, Row,Col } from 'reactstrap';


class Filters extends Component {
   


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
        const { filters, count } = this.props;
        console.log('---MAIN:filters---', filters)
        return (
            <Form>
                <Card className="CardTours">
                    <CardBody>
                        <CardHeader ><b className="YColor">{count}</b> знайдено</CardHeader>
                        {filters.map(filterItem =>
                            <FilterItem filterData={filterItem} key={filterItem.id} handleCheckChieldElement={this.handleCheckChieldElement} />
                        )}
                        <Row >
                            <Col  className="d-flex justify-content-center">
                                <Button className='mt-2 buttonHotel'>Знайти</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>

            </Form>
        );
    }
}

export default Filters;