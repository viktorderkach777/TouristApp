import React, { Component } from 'react';
import FilterItem from './filterItem';
import { Button, Form, Card, CardHeader, CardBody, Row, Col, CardFooter } from 'reactstrap';
import Select from 'react-select';

const options = [
    { value: 'uah', label: 'UAH' },
    { value: 'rub', label: 'RUB' },
    { value: 'eur', label: 'EUR' },
    { value: 'usd', label: 'USD' },
];

class Filters extends Component {
    state = {
        selectedOption: 'USD',        
    };
    
    handleChange = selectedOption => {
        this.setState({ selectedOption });
        const { setCurrency = f => f } = this.props;
        setCurrency(selectedOption);       
    };

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
        const { selectedOption } = this.state;
        //console.log('---MAIN:filters---', filters)
        // console.log("state", this.state)
        // console.log("props", this.props)
        return (
            <Form>
                <Card className="CardTours">
                    <CardBody>
                        <CardHeader ><b className="YColor">{count}</b> знайдено</CardHeader>
                        {filters.map(filterItem =>
                            <FilterItem filterData={filterItem} key={filterItem.id} handleCheckChieldElement={this.handleCheckChieldElement} />
                        )}
                        <Row >
                            <Col className="d-flex justify-content-center">
                                <Button className='mt-2 buttonHotel'>Знайти</Button>
                            </Col>
                        </Row>
                    </CardBody>
                    <CardFooter>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={options}
                            defaultValue={{ value: 'usd', label: 'USD' }}
                            placeholder={"Select your currency"}
                        />
                    </CardFooter>
                </Card>

            </Form>
        );
    }
}

export default Filters;