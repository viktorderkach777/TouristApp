/* eslint-disable eqeqeq */
import React, { Component } from 'react';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';


const SoapIcon = ['', 'soap-icon-locations', 'soap-icon-beach', 'soap-icon-hotel', 'soap-icon-check', 'soap-icon-party', 'soap-icon-notice']

const ParamItemList = (props) => {
    //console.log('ParamItemList', props)
    //let child = props.children;
    //console.log('child', child)
    return (
        props != null ?
            <Row>
                <Col xs="12" >
                    <div className='icon-box style6'><i className={props.priority < 7 ? SoapIcon[props.priority] : SoapIcon[6]}></i>
                        <div className="description text-left">
                            <h4 className="box-title">{props.name}</h4>
                            <p>{props.description}</p>
                        </div>
                    </div>
                  
                        {(props.children == 'undefined' || props.children.length == 0) ? ('') :
                        (
                            <ul className="check facilities text-left">
                                {props.children.map((itemChild, index) => <li key={index}> {itemChild.name}</li>)}
                            </ul>
                        )}
                   
                </Col>
            </Row> : ''
    )
}



class Tabs extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: new Array(4).fill('1'),
            tour: this.props.tour
        };
    }

    static defaultProps = {
        param: []
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
        //console.log('--- tabs)----', this.props);
        this.setState({ tour: this.props.tour });

    }

    tabPane() {
        const { tour, param } = this.props;        
        //  console.log('---Tabs props----', this.props );
        //  console.log('---Tabs state----', this.state );
         
        return (
            <>
                {/* опис готелю */}
                <TabPane tabId="1" >
                    <h3>{tour.name} *</h3>
                    {tour.description}

                
               {param.length == 0 ? ('') :
                        (param.map(item =>
                            <ParamItemList {...item} key={item.priority} />
                        ))}
               

                </TabPane>
                {/* відгуки */}
                <TabPane tabId="2">
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
        // console.log('---Tabs state----', this.state);
        // console.log('---Tabs props----', this.props);
        // console.log('---Data----', this.props.class);
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
