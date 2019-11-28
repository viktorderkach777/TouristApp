import React, { Component } from 'react';
import {
  Label,
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Alert,
  FormGroup,
  Container,
  CardFooter,
  FormFeedback
} from 'reactstrap';
import AdminService from '../AdminService';
import Cropper from 'react-cropper';
import { Link } from 'react-router-dom';
import MyModal from '../myModal';
import defaultPath from './default-photo.jpg';
import 'cropperjs/dist/cropper.css';
import './addPhotoHotel.css';

const IMAGE_MIN_SIZE = 3000;
const IMAGE_MAX_SIZE = 10000000;

class PhotoHotelAdd extends Component {

  state = {
    countries: [
      {
        id: 1,
        name: 'Австралія'
      }
    ],
    selectedCountry: 1,
    regions: [],
    regionsLoad: false,
    selectedRegion: '',
    hotelsLoad: false,
    hotels: [],
    selectedHotel: '',
    hotelSelect: false,
    errors: {},
    isLoading: false,
    isLoadingPhoto: false,
    src: '',
    imageBase64: defaultPath,
    imageError: true,
    isModalOpen: false,
    modalText: '',
    modalType: 'danger'
  };

  toggleModal = (modalType, modalText) => {
    if (!this.state.isModalOpen) {
      this.setState({
        modalText,
        modalType,
        isModalOpen: !this.state.isModalOpen,
      });
    }
    else {
      this.setState({
        isModalOpen: !this.state.isModalOpen,
      });
    }
  }

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
        this.toggleModal("danger", "Невірний тип файлу!");
      }
      else if (currentFileSize > IMAGE_MAX_SIZE) {
        this.toggleModal("danger", "Розмір файлу повинен бути меншим 10Mb!");
      }
      else if (currentFileSize < IMAGE_MIN_SIZE) {
        this.toggleModal("danger", "Розмір файлу повинен бути більшим 3Kb!");
      }
      else if (currentFile.name && currentFile.name === "default-photo.jpg") {
        this.toggleModal("danger", "Недопустимий файл!");
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          this.toggle(e);
          this.setState({ src: reader.result });
        };
        reader.readAsDataURL(currentFile);
      }
    } else {
      this.toggleModal("danger", "Необхідно вибрати файл!");
    }
  };

  toggle = e => {
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
    AdminService.getCountries()
      .then(res => {
        const countries = res.data;
        this.setState({ countries });
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
        this.setState({
          regions,
          regionsLoad: true,
          selectedHotel: '',
          selectedRegion: '',
          imageBase64: defaultPath,
          errors: {}
        });
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
        this.setState({
          hotels,
          hotelsLoad: true,
          selectedHotel: '',
          imageBase64: defaultPath,
          errors: {}
        });
      })
      .catch(() => {
        console.log('--failed--');
      });
  };

  handleChangeSelectHotel = (e) => {

    this.setStateByErrors(e.target.name, e.target.value);
    this.setState({
      hotelSelect: true,
      imageBase64: defaultPath,
      errors: {}
    });
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    let errors = {};
    const { imageBase64, selectedHotel } = this.state;
    if (imageBase64 === defaultPath) {
      this.toggleModal("danger", "Виберіть готель і його фото!");
      return;
    }

    if (this.state.selectedCountry === '') errors.selectedCountry = "Can't be empty!"
    if (this.state.selectedRegion === '') errors.selectedRegion = "Can't be empty!"
    if (this.state.selectedHotel === '') errors.selectedHotel = "Can't be empty!"

    const isValid = Object.keys(errors).length === 0
    if (isValid) {
      const model = {
        hotelId: selectedHotel,
        imageBase64: imageBase64
      };

      this.setState({ isLoading: true });
      AdminService.addPhotoHotel(model)
        .then(
          () => { this.setState({ done: true, isLoading: false }, this.toggleModal("success", "Фото додано!")) },
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
      modalText,
      modalType,
      isModalOpen
    } = this.state;

    const form = (
      <React.Fragment>
        <div className="app flex-row align-items-center" >
          <Container>
            <Row>
              <MyModal isModalOpen={isModalOpen} toggle={this.toggleModal} modalText={modalText} modalType={modalType} />
            </Row>
            <div id='hotel-image'>
              <Row className="justify-content-center">
                <Col md="8">
                  <CardGroup>
                    <Card className="p-4">
                      <CardBody>
                        <Form onSubmit={this.onSubmitForm}>
                          <h1> Додати фото готеля</h1>
                          {!!errors.invalid ? <Alert color="danger">{errors.invalid}</Alert> : ''}
                          <Label className="mt-4">Вибір країни</Label>
                          <InputGroup className="mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText className="iconsColor">
                                <i className="fa fa-globe" aria-hidden="true"></i>
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input
                              type="select"
                              invalid={!!errors.selectedCountry}
                              className="form-control"
                              name="selectedCountry"
                              id="selectedCountry"
                              value={this.state.selectedCountry}
                              onChange={this.handleChangeSelectCountry}>
                              {countries.map((item, index) => <option key={index} value={item.value} >{item.label}</option>)}
                            </Input>
                            <FormFeedback>{errors.selectedCountry}</FormFeedback>
                          </InputGroup>
                          <div hidden={!regionsLoad}>
                            <FormGroup  >
                              <Label>Вибір курорту</Label>
                              <InputGroup  >
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText className="iconsColor">
                                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  className="form-control"
                                  invalid={!!errors.selectedRegion}
                                  type="select"
                                  name="selectedRegion"
                                  id="selectedRegion"
                                  value={this.state.selectedRegion}
                                  onChange={this.handleChangeSelectRegion}>
                                  {regions.map(item => <option key={item.id} value={item.id} >{item.name}</option>)}
                                </Input>
                                <FormFeedback>{errors.selectedRegion}</FormFeedback>
                              </InputGroup>
                            </FormGroup>
                          </div>
                          <div hidden={!hotelsLoad} >
                            <FormGroup>
                              <Label>Вибір готеля</Label>
                              <InputGroup className="mb-3">
                                <InputGroupAddon addonType="prepend">
                                  <InputGroupText className="iconsColor">
                                    <i className="fa fa-star" aria-hidden="true"></i>
                                  </InputGroupText>
                                </InputGroupAddon>
                                <Input
                                  type="select"
                                  className="form-control"
                                  invalid={!!errors.selectedHotel}
                                  name="selectedHotel"
                                  id="selectedHotel"
                                  value={this.state.selectedHotel}
                                  onChange={this.handleChangeSelectHotel}>
                                  {hotels.map(item => <option key={item.id} value={item.id} >{item.name}</option>)}
                                </Input>
                                <FormFeedback>{errors.selectedHotel}</FormFeedback>
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
                                            aspectRatio={640 / 480}
                                            style={{ height: "auto" }}
                                            preview=".img-preview"
                                            guides={false}
                                            viewMode={1}
                                            dragMode="move"
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
              </Row>
            </div>
          </Container>
        </div>
      </React.Fragment>
    );
    return form;
  }
}

export default PhotoHotelAdd;