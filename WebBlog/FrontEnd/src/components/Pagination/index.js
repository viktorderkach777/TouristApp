import React, { Component } from 'react';
import {Form, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
//import classnames from 'classnames';

class PaginationBar extends Component {
    state = {}
    render() {
        console.log('PaginationBar props',this.props);
        return (
            <React.Fragment>
                <Form>
                <Pagination>
                {!!this.props.currentPage ===1  ? (
                    <PaginationItem ><PaginationLink previous tag="button" /></PaginationItem>)  :
                    (<PaginationItem disabled ><PaginationLink previous tag="button" /></PaginationItem>)}
                    <PaginationItem active>
                        <PaginationLink tag="button">
                            1
                    </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink tag="button">
                            2
                    </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink tag="button">
                            3
                    </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink tag="button">
                            4
                    </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink tag="button">
                            5
                </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink next tag="button" />
                    </PaginationItem>
                </Pagination>
                </Form>
            </React.Fragment>

        );
    }
}

export default PaginationBar;

