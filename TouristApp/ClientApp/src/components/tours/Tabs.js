/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

class Tabs extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: new Array(4).fill('1'),
            tour:{}


        };
    }

    lorem() {
        return 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit.'
    }

    toggle(tabPane, tab) {
        const newArray = this.state.activeTab.slice()
        newArray[tabPane] = tab
        this.setState({
            activeTab: newArray,
        });
    }
    componentDidMount() {

        this.setState({ tour: this.props.tour});

    }

    tabPane() {
        const { tour } = this.props;
        
        console.log('---Tabs props----', this.props );
        console.log('---Tabs state----', this.state );
         
        return (
            <>
                {/* опис готелю */}
                <TabPane tabId="1">
                <h3>{tour.name} *</h3>
                {tour.description}
                
                 {/* {hotelParametries.map(item =>
                     <span> <b>{item.name}</b> {item.description}}</span> )} */}


                </TabPane>
                {/* відгуки */}
                <TabPane tabId="2">
                    {`2. ${this.lorem()}`}
                </TabPane>
                {/* карта */}
                <TabPane tabId="3">
                    {`3. ${this.lorem()}`}
                </TabPane>
            </>
        );
    }

    render() {
        const { activeTab } = this.state;
        return (
            <div className="animated fadeIn">
                <Row className="p-2">
                    <Col xs="12" md="12" className="mb-4">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    active={this.state.activeTab[0] === '1'}
                                    onClick={() => { this.toggle(0, '1'); }}
                                >
                                    <span className={classnames({ 'YColor': activeTab[0] == 1 })}><b>Опис готелю</b></span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    active={this.state.activeTab[0] === '2'}
                                    onClick={() => { this.toggle(0, '2'); }}
                                >
                                    <span className={classnames({ 'YColor': activeTab[0] == 2 })}><b>Відгуки</b></span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    active={this.state.activeTab[0] === '3'}
                                    onClick={() => { this.toggle(0, '3'); }}
                                >
                                    <span className={classnames({ 'YColor': activeTab[0] == 3 })}><b>Карта</b></span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab[0]}>
                            {this.tabPane()}
                        </TabContent>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Tabs;
