import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { Label, Button, Card, CardBody, CardGroup, Col, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert, FormGroup, Container, Modal, ModalBody, ModalFooter, ModalHeader, CardFooter } from 'reactstrap';
import 'cropperjs/dist/cropper.css';
//import { Redirect } from "react-router";
import AdminService from '../AdminService';
import defaultPath from './default-photo.jpg';
import Cropper from 'react-cropper';
import { notify } from '../../Notifications'
import { Link } from 'react-router-dom';

const iconsColor = {
  backgroundColor: '#00aced',
  color: '#fff',
  borderColor: '#00aced'
}

const IMAGE_MIN_SIZE = 3000;
const IMAGE_MAX_SIZE = 10000000;

class AddPhotoHotelForm extends Component {

  state = {
    countries: [
      {
        id: 33,
        name: 'Єгипет'
      }
    ],
    selectedCountry: '33',
    regions: [],
    regionsLoad: false,
    selectedRegion: '',
    hotelsLoad: false,
    hotels: [],
    selectedHotel: '',
    hotelSelect: false,
    errors: {
    },
    done: false,
    isLoading: false,
    isLoadingPhoto: false,
    src: '',
    imageBase64: defaultPath,
    imageError: true,
    danger: false,
    modalText: ''
  };

  toggleDanger = () => {
    this.setState({
      danger: !this.state.danger,
    });
  }

  // changeInput = (e) => {
  //   e.preventDefault();
  //   let files;
  //   if (e.dataTransfer) {
  //     files = e.dataTransfer.files;
  //   } else if (e.target) {
  //     files = e.target.files;
  //   }
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     this.setState({ src: reader.result });
  //   };

  //   reader.readAsDataURL(files[0]);
  //   this.setState({ isLoadingPhoto: true });    
  // };



  // cropImage = () => {
  //   if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
  //     return;
  //   }
  //   this.setState({ imageBase64: this.cropper.getCroppedCanvas().toDataURL() });
  //   this.setState({ isLoadingPhoto: false });
  //   this.setState({ src: '' });
  // }

  changeInput = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    if (files && files[0]) {
      const currentFile = files[0];
      const currentFileSize = currentFile.size;
      if (!currentFile.type.match(/^image\//)) {
        this.toggleDanger();
        this.setState({
          modalText: "Error file type!",
        });
      }
      else if (currentFileSize > IMAGE_MAX_SIZE) {
        this.toggleDanger();
        this.setState({
          modalText: "The image size must be less than 10Mb!",
        });
      }
      else if (currentFileSize < IMAGE_MIN_SIZE) {
        this.toggleDanger();
        this.setState({
          modalText: "The image size must be more than 3Kb!",
        });
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          this.toggle(e);
          this.setState({ src: reader.result });
        };
        reader.readAsDataURL(currentFile);
      }
    } else {
      this.toggleDanger();
      this.setState({
        modalText: "Select an image, please!",
      });
    }
  };

  toggle = e => {
    //e.preventDefault();
    this.setState(prevState => ({
      isLoadingPhoto: !prevState.isLoadingPhoto
    }));
  };

  cropImage = (e) => {
    e.preventDefault();
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }

    this.setState({
      imageBase64: this.cropper.getCroppedCanvas().toDataURL(),
      isLoadingPhoto: false,
      src: '',
      imageError: false
    });
  }

  optionCropImage = (e, option, value) => {
    e.preventDefault();
    if (typeof this.cropper.getCroppedCanvas() === "undefined") {
      return;
    }

    switch (option) {
      case "rotate":
        this.cropper.rotate(value);
        break;
      case "zoom":
        this.cropper.zoom(value);
        break;
      default:
        break;
    }
  };

  // operationImage = (e, type, value) => {
  //   e.preventDefault();

  //   switch (type) {

  //     case 'ROTARE_LEFT':
  //       this.cropper.rotate(value);
  //       break;
  //     case 'ROTARE_RIGHT':
  //       this.cropper.rotate(-value);
  //       break;
  //     case 'ZOOM+':
  //       this.cropper.zoom(value);
  //       break;
  //     case 'ZOOM-':
  //       this.cropper.zoom(value);
  //       break;
  //     default:

  //   }
  // };

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

  componentDidMount() {
    console.log('---componentDiDMount----');
    AdminService.getCountries()
      .then(res => {
        const countries = res.data;
        this.setState({ countries });
        console.log('countries', countries);
      })
      .catch(() => { console.log('--failed--'); });
  }

  handleChange = (e) => {
    this.setStateByErrors(e.target.name, e.target.value);
  };

  handleChangeSelectCountry = (e) => {

    this.setStateByErrors(e.target.name, e.target.value);
    AdminService.getRegiones(e.target.value)
      .then(res => {
        const regions = res.data;
        this.setState({ regions, regionsLoad: true });
      })
      .catch(() => {
        console.log('--failed--');
      });

  };

  handleChangeSelectRegion = (e) => {

    this.setStateByErrors(e.target.name, e.target.value);
    AdminService.getHotels(e.target.value)
      .then(res => {
        const hotels = res.data;
        this.setState({ hotels, hotelsLoad: true });
      })
      .catch(() => {
        console.log('--failed--');
      });

  };

  handleChangeSelectHotel = (e) => {

    this.setStateByErrors(e.target.name, e.target.value);
    this.setState({ hotelSelect: true });
    console.log('--handleChangeSelectHotel--, hotelSelect', this.state.hotelSelect);

  };



  onSubmitForm = (e) => {
    e.preventDefault();
    let errors = {};
    console.log('submit tour', this.state);
    const { imageBase64, selectedHotel } = this.state;

    if (this.state.price === '') errors.price = "Can't be empty!"
    if (this.state.selectedCountry === '') errors.selectedCountry = "Can't be empty!"
    if (this.state.selectedRegion === '') errors.selectedRegion = "Can't be empty!"
    if (this.state.selectedHotel === '') errors.selectedHotel = "Can't be empty!"

    const isValid = Object.keys(errors).length === 0
    if (isValid) {
      const model = {
        hotelId: selectedHotel,
        imageBase64: imageBase64
      };
      console.log('validform addPhotoHotel', model);

      this.setState({ isLoading: true });
      AdminService.addPhotoHotel(model)
        .then(
          //() => { this.setState({ done: true, isLoading: false }, () => notify("Фото додано!", '#071')) },
          () => { this.setState({ done: true, isLoading: false }) },
          (err) => this.setState({ errors: err.response.data, isLoading: false })
        )
        .catch(() => { console.log('--failed--'); });
    }
    else {
      this.setState({ errors });
    }
  };

  render() {
    const {
      hotelSelect,
      imageBase64,
      hotels,
      hotelsLoad,
      regions,
      regionsLoad,
      countries,
      errors,
      isLoading,
      imageError,
      isLoadingPhoto,
      modalText
    } = this.state;
    console.log('----AddTour---', this.state);
    const form = (
      <React.Fragment>
        <div className="app flex-row align-items-center">
          <Container>
            <Row>
              <Modal isOpen={this.state.danger} toggle={this.toggleDanger}
                className={'modal-danger ' + this.props.className}>
                <ModalHeader toggle={this.toggleDanger}>Warning!</ModalHeader>
                <ModalBody>
                  {modalText}
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.toggleDanger}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </Row>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form onSubmit={this.onSubmitForm}>
                        <h1> Додати фото готеля</h1>
                        <p className="text-muted">Додайте фото готеля</p>
                        {!!errors.invalid ? <Alert color="danger">{errors.invalid}</Alert> : ''}
                        <Label>Вибір країни</Label>

                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText style={iconsColor}>
                              <i className="fa fa-globe" aria-hidden="true"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="select"
                            className="form-control"
                            name="selectedCountry"
                            id="selectedCountry"
                            value={this.state.selectedCountry}
                            onChange={this.handleChangeSelectCountry}>
                            {countries.map(item => <option key={item.value} value={item.value} >{item.label}</option>)}
                          </Input>
                        </InputGroup>


                        <div hidden={!regionsLoad}>
                          <FormGroup  >

                            <Label>Вибір курорту</Label>
                            <InputGroup  >
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText style={iconsColor}>
                                  <i className="fa fa-map-marker" aria-hidden="true"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input type="select"
                                name="selectedRegion"
                                id="selectedRegion"
                                value={this.state.selectedRegion}
                                onChange={this.handleChangeSelectRegion}>
                                {regions.map(item => <option key={item.id} value={item.id} >{item.name}</option>)}
                              </Input>
                            </InputGroup>
                          </FormGroup>
                        </div>
                        <div hidden={!hotelsLoad} >
                          <FormGroup>
                            <Label>Вибір готеля</Label>
                            <InputGroup className="mb-3">
                              <InputGroupAddon addonType="prepend">
                                <InputGroupText style={iconsColor}>
                                  <i className="fa fa-star" aria-hidden="true"></i>
                                </InputGroupText>
                              </InputGroupAddon>
                              <Input type="select"
                                name="selectedHotel"
                                id="selectedHotel"
                                value={this.state.selectedHotel}
                                onChange={this.handleChangeSelectHotel}>
                                {hotels.map(item => <option key={item.id} value={item.id} >{item.name}</option>)}
                              </Input>
                            </InputGroup>
                          </FormGroup>
                        </div>
                        <div hidden={!hotelSelect}>
                          {!!errors.imageBase64 && imageError ? <Alert color="danger" className="d-flex justify-content-center" >{errors.imageBase64}</Alert> : ''}
                          <div className='container d-flex justify-content-center'>
                            <div className="form-group ">
                              <label id="labelForInput" htmlFor="inputFile">
                                {
                                  !isLoadingPhoto ?
                                    <img
                                      src={imageBase64}
                                      //className="img-circle"
                                      id="image"
                                      alt=""
                                      name="image"
                                      width="250" />
                                    : <p></p>
                                }
                                <input type="file" id="inputFile" onChange={this.changeInput} ></input>
                              </label>
                            </div>

                            <div className={!this.state.isLoadingPhoto ? "div-hidden" : "div-visible form-group"} >
                              <div className="fluid-container d-flex justify-content-center">
                                <div className="col-12 ">
                                  <Card>
                                    <CardBody>
                                      <div style={{ width: "100%" }}>
                                        <Cropper                                          
                                          //style={{ height: 400, width: "100%" }}
                                          //aspectRatio={1 / 1}
                                          aspectRatio={640 / 480}
                                          style={{ height: "auto" }}
                                          preview=".img-preview"
                                          guides={false}
                                          viewMode={1}
                                          dragMode="move"                                         
                                          viewMode={1}
                                          src={this.state.src}
                                          ref={cropper => { this.cropper = cropper; }}
                                        />
                                      </div>
                                    </CardBody>
                                    <CardFooter>
                                      <div className="row">
                                        <div className="col">
                                          <button className="btn btn-success" onClick={e => this.cropImage(e)}>
                                            Crop
                                      </button>
                                          <button className="btn btn-danger" onClick={e => this.toggle(e)}>
                                            Cancel
                                      </button>
                                        </div>
                                        <div className="order-last">
                                          <div>
                                            <button className="btn btn-info" onClick={e => this.optionCropImage(e, "rotate", -90)}>
                                              <i className="fa fa-rotate-left" />
                                            </button>
                                            <button className="btn btn-info" onClick={e => this.optionCropImage(e, "rotate", 90)}>
                                              <i className="fa fa-rotate-right" />
                                            </button>

                                            <button className="btn btn-info" onClick={e => this.optionCropImage(e, "zoom", 0.1)}>
                                              <i className="fa fa-search-plus" />
                                            </button>
                                            <button className="btn btn-info" onClick={e => this.optionCropImage(e, "zoom", -0.1)}>
                                              <i className="fa fa-search-minus" />
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </CardFooter>
                                  </Card>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div> */}

                          {/* <label id="labelForInput" htmlFor="inputFile">
                            {
                              !this.state.isLoadingPhoto ?
                                <img
                                  src={imageBase64}
                                  id="image"
                                  alt=""
                                  name="image"
                                  // style={{ marginLeft: '80px' }}
                                  width="100%"
                                />
                                : <p></p>
                            }
                            {!!errors.image ? <span className="help-block">{errors.image}</span> : ''}
                            <input type="file" id="inputFile" onChange={this.changeInput} ></input>
                          </label> */}


                          {/* <div className={!this.state.isLoadingPhoto ? "div-hidden" : "div-visible form-group"}>

                            <Cropper

                              aspectRatio={640 / 480}
                              style={{ height: "auto" }}
                              preview=".img-preview"
                              guides={false}
                              viewMode={1}
                              src={this.state.src}
                              ref={cropper => { this.cropper = cropper; }}
                            />
                            <p></p>
                            <button type="button" onClick={this.cropImage} className="btn btn-primary">Crop Image</button>
                            <button type="button" onClick={e => this.operationImage(e, 'ZOOM+', 0.1)} className="btn btn-primary  btn-crop"><i className="fa fa-search-plus" aria-hidden="true" /></button>
                            <button type="button" onClick={e => this.operationImage(e, 'ZOOM-', -0.1)} className="btn btn-primary  btn-crop"><i className="fa fa-search-minus" aria-hidden="true" /></button>
                            <button type="button" onClick={e => this.operationImage(e, 'ROTARE_LEFT', 45)} className="btn btn-primary  btn-crop"><i className="fa fa-repeat" aria-hidden="true" /></button>
                            <button type="button" onClick={e => this.operationImage(e, 'ROTARE_RIGHT', 45)} className="btn btn-primary  btn-crop"><i className="fa fa-undo" aria-hidden="true" /></button>
                          </div> */}
                          {/* </div> */}
                        </div>
                        <Row className="text-center">
                          <Col md="6">
                            <Button type="submit" color="primary" className="px-4  mb-4" disabled={isLoading}>Додати фото</Button>
                          </Col>
                          <Col md="6">
                            <Link to={`/admin/`}>
                              <Button color="danger" className="px-4 mb-4" >Закрити</Button>
                            </Link>
                          </Col>
                        </Row>
                        {/* <Row>
                          <Col xs="6">
                            <Button color="primary" className="px-4" disabled={loading}>Login</Button>
                          </Col>
                          <Col xs="6" className="text-right">
                            <Button color="link" className="px-0">Forgot password?</Button>
                          </Col>
                        </Row> */}
                      </Form>
                    </CardBody>

                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>

        {/* <div className="app flex-row align-items-center">

          <div className="justify-content-center">
            <Col md="6" xs="12">
              <CardGroup>
                <Card className="p-2">
                  <CardBody>
                    <Form onSubmit={this.onSubmitForm}>
                      <h1> Додати фото готеля</h1>
                      <p className="text-muted">Додайте фото готеля</p>
                      {!!errors.invalid ? <Alert color="danger">{errors.invalid}</Alert> : ''}
                      <FormGroup>
                        <Label>Вибір країни</Label>
                        <InputGroup  >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText style={iconsColor}>
                              <i className="fa fa-globe" aria-hidden="true"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input type="select"
                            name="selectedCountry"
                            id="selectedCountry"
                            value={this.state.selectedCountry}
                            onChange={this.handleChangeSelectCountry}>
                            {countries.map(item => <option key={item.value} value={item.value} >{item.label}</option>)}
                          </Input>
                        </InputGroup>
                      </FormGroup>
                      <div hidden={!regionsLoad}>
                        <FormGroup  >

                          <Label>Вибір курорту</Label>
                          <InputGroup  >
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText style={iconsColor}>
                                <i className="fa fa-map-marker" aria-hidden="true"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="select"
                              name="selectedRegion"
                              id="selectedRegion"
                              value={this.state.selectedRegion}
                              onChange={this.handleChangeSelectRegion}>
                              {regions.map(item => <option key={item.id} value={item.id} >{item.name}</option>)}
                            </Input>
                          </InputGroup>
                        </FormGroup>
                      </div>
                      <div hidden={!hotelsLoad} >
                        <FormGroup>
                          <Label>Вибір готеля</Label>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText style={iconsColor}>
                                <i className="fa fa-star" aria-hidden="true"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input type="select"
                              name="selectedHotel"
                              id="selectedHotel"
                              value={this.state.selectedHotel}
                              onChange={this.handleChangeSelectHotel}>
                              {hotels.map(item => <option key={item.id} value={item.id} >{item.name}</option>)}
                            </Input>
                          </InputGroup>
                        </FormGroup>
                      </div>
                      <div hidden={!hotelSelect}>
                        <div>

                          <label id="labelForInput" htmlFor="inputFile">
                            {
                              !this.state.isLoadingPhoto ?
                                <img
                                  src={imageBase64}
                                  id="image"
                                  alt=""
                                  name="image"
                                  // style={{ marginLeft: '80px' }}
                                  width="100%"
                                />
                                : <p></p>
                            }
                            {!!errors.image ? <span className="help-block">{errors.image}</span> : ''}
                            <input type="file" id="inputFile" onChange={this.changeInput} ></input>
                          </label>


                          <div className={!this.state.isLoadingPhoto ? "div-hidden" : "div-visible form-group"}>

                            <Cropper

                              aspectRatio={640 / 480}
                              style={{ height: "auto" }}
                              preview=".img-preview"
                              guides={false}
                              viewMode={1}
                              src={this.state.src}
                              ref={cropper => { this.cropper = cropper; }}
                            />
                            <p></p>
                            <button type="button" onClick={this.cropImage} className="btn btn-primary">Crop Image</button>
                            <button type="button" onClick={e => this.operationImage(e, 'ZOOM+', 0.1)} className="btn btn-primary  btn-crop"><i className="fa fa-search-plus" aria-hidden="true" /></button>
                            <button type="button" onClick={e => this.operationImage(e, 'ZOOM-', -0.1)} className="btn btn-primary  btn-crop"><i className="fa fa-search-minus" aria-hidden="true" /></button>
                            <button type="button" onClick={e => this.operationImage(e, 'ROTARE_LEFT', 45)} className="btn btn-primary  btn-crop"><i className="fa fa-repeat" aria-hidden="true" /></button>
                            <button type="button" onClick={e => this.operationImage(e, 'ROTARE_RIGHT', 45)} className="btn btn-primary  btn-crop"><i className="fa fa-undo" aria-hidden="true" /></button>
                          </div>
                        </div>
                      </div>

                      <Row className="text-center">
                        <Col md="6">
                          <Button type="submit" color="primary" className="px-4  mb-4" disabled={isLoading}>Додати фото</Button>
                        </Col>
                        <Col md="6">
                          <Link to={`/admin/`}>
                            <Button color="danger" className="px-4 mb-4" >Закрити</Button>
                          </Link>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>

              </CardGroup>
            </Col>
          </div>

        </div> */}
      </React.Fragment>
    );
    return form;
  }
}


const PhotoHotelAdd = AddPhotoHotelForm;
export default PhotoHotelAdd;