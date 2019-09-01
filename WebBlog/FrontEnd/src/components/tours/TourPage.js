import React, { Component } from 'react';
import Lightbox from 'react-image-lightbox';
import axios from 'axios';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import { serverUrl } from '../../config';
//import classnames from 'classnames';

import './tours.css'
import {
    
    Row,
    Col,
} from 'reactstrap';


export default class Hotel extends Component {
    state = {
        activeTab: '1',
        photoIndex: 0,
        isOpen: false,
        images: []
    };

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }
    componentDidMount() {
        const url = `${serverUrl}api/SampleData/Images`;
        axios.get(url)
            .then(
                result => {
                    console.log('--result--', result.data);
                    this.setState({ images: result.data });
                },
                err => {
                    console.log('--problem--', err);
                }
            );
    }

    onClickImage = (e, img_index) => {
        e.preventDefault();
        this.setState({ photoIndex: img_index, isOpen: true });
    }

    render() {
        const { photoIndex, isOpen, images } = this.state;
        const imageItems = images.map((item, index) => {
            return (
                <div key={item.id} className="col-lg-3 col-md-4 col-6">
                    <a href="url" className="d-block mb-4 h-100" onClick={(e) => this.onClickImage(e, index)} >
                        <img className="img-fluid img-thumbnail" src={serverUrl + item.smallImage} alt="" />
                    </a>
                </div>
            );
        });
        return (

            <Row className="justify-content-md-center">
                <div className="text-center">
                <Col xs="12" sm="6" lg="3">
                                    {isOpen && (
                                        <Lightbox
                                            mainSrc={serverUrl + images[photoIndex].bigImage}
                                            nextSrc={serverUrl + images[(photoIndex + 1) % images.length].bigImage}
                                            prevSrc={serverUrl + images[(photoIndex + images.length - 1) % images.length].bigImage}
                                            onCloseRequest={() => this.setState({ isOpen: false })}
                                            onMovePrevRequest={() =>
                                                this.setState({
                                                    photoIndex: (photoIndex + images.length - 1) % images.length,
                                                })
                                            }
                                            onMoveNextRequest={() =>
                                                this.setState({
                                                    photoIndex: (photoIndex + 1) % images.length,
                                                })
                                            }
                                        />
                                    )}

                                </Col>
                            
                            <div className="row text-center text-lg-left">

                                {imageItems}

                            </div>

                </div>
            </Row>
        );
    }
}