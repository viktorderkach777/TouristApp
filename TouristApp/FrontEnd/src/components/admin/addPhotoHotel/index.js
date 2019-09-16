import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import {Label,Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Alert } from 'reactstrap';
import 'cropperjs/dist/cropper.css';
//import { Redirect } from "react-router";
import  AdminService from '../AdminService';
import defaultPath from './default-photo.jpg';
import Cropper from 'react-cropper';
import { notify } from '../../Notifications'
import { Link } from 'react-router-dom';

const iconsColor = {
  backgroundColor: '#00aced',
  color: '#fff',
  borderColor: '#00aced'
}

class AddPhotoHotelForm extends Component {
  
    state = {
      countries: [
        {
          id:7,
          name:'Australia'
        }
         ],
          selectedCountry:'7',
         regions:[],
         regionsLoad:false,
         selectedRegion:'',
         hotelsLoad:false,
         hotels:[],
         selectedHotel:'',
         hotelSelect:false,
      errors: {
      },
      done: false,
      isLoading: false,
      isLoadingPhoto: false,
      src: '',
      imageBase64: defaultPath
    };



    changeInput = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          this.setState({ src: reader.result });
        };
    
        reader.readAsDataURL(files[0]);
        this.setState({ isLoadingPhoto: true });
    
        // const currentFile = files[0];
        // const currentFileSize = currentFile.size;
        // if (currentFileSize>imageMaxSize ){
        //     reader.readAsDataURL(currentFile);
        //     this.setState({ isLoadingPhoto: true });
        // }
        // else{
        //     alert("Фото має бути більше 3Мb");
    
        // };
      };
    
      cropImage = () => {
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
          return;
        }
        this.setState({ imageBase64: this.cropper.getCroppedCanvas().toDataURL() });
        this.setState({ isLoadingPhoto: false });
        this.setState({ src: '' });
      }

      operationImage = (e, type, value) => {
        e.preventDefault();
    
        switch (type) {
    
          case 'ROTARE_LEFT':
            this.cropper.rotate(value);
            break;
          case 'ROTARE_RIGHT':
            this.cropper.rotate(-value);
            break;
          case 'ZOOM+':
            this.cropper.zoom(value);
            break;
          case 'ZOOM-':
            this.cropper.zoom(value);
            break;
          default:
    
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
    console.log('---componentDiDMount----');
    AdminService.getCountries()
      .then(res => {
        const countries = res.data;
        this.setState({ countries });
      })
    .catch(() => {console.log('--failed--'); });
    }

  handleChange = (e) => {
    this.setStateByErrors(e.target.name, e.target.value);
  };

  handleChangeSelectCountry = (e) => {
   
    this.setStateByErrors(e.target.name, e.target.value);
      AdminService.getRegiones(e.target.value)
          .then(res => {
            const regions = res.data;
            this.setState({ regions, regionsLoad:true });
          })
          .catch(() => {console.log('--failed--');
      });

  };

  handleChangeSelectRegion = (e) => {
   
    this.setStateByErrors(e.target.name, e.target.value);
      AdminService.getHotels(e.target.value)
          .then(res => {
            const hotels = res.data;
            this.setState({ hotels, hotelsLoad:true });
          })
          .catch(() => {console.log('--failed--');
      });

  };

  handleChangeSelectHotel = (e) => {
   
    this.setStateByErrors(e.target.name, e.target.value);
    this.setState({ hotelSelect:true });
      

  };


  
  onSubmitForm = (e) => {
    e.preventDefault();
    let errors = {};
    console.log('submit tour');
    const {imageBase64,selectedHotel } = this.state;
    
    if (this.state.price === '') errors.price = "Can't be empty!"
    if (this.state.selectedCountry === '') errors.selectedCountry = "Can't be empty!"
    if (this.state.selectedRegion === '') errors.selectedRegion = "Can't be empty!"
    if (this.state.selectedHotel === '') errors.selectedHotel = "Can't be empty!"

    const isValid = Object.keys(errors).length === 0
    if (isValid)
    {
     const model = {
        hotelId: selectedHotel,
        imageBase64:imageBase64
    };
      console.log('validform addPhotoHotel', model);
     
      this.setState({ isLoading: true });
      AdminService.addPhotoHotel(model)
      .then(
        () => { this.setState({ done: true, isLoading: false},() => notify("Фото додано!", '#071'))},
        (err) => this.setState({ errors: err.response.data, isLoading: false })
      )
      .catch(() => { console.log('--failed--'); });
}
else {
  this.setState({ errors });
}
  };

  render() {
    const {hotelSelect,imageBase64,hotels, hotelsLoad, regions, regionsLoad, countries,errors, isLoading } = this.state;
    console.log('----AddTour---', this.state);
    const form = (
      <React.Fragment>
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onSubmitForm}>
                      <h1> Додати фото готеля</h1>
                      <p className="text-muted">Додайте фото готеля</p>
                  {!!errors.invalid ? <Alert color="danger">{errors.invalid}</Alert> : ''}
                  
                  <Label>Вибір країни</Label>
                  <InputGroup className="mb-3" >
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
                              {countries.map(item => <option  key={item.id} value={item.id} >{item.name}</option>)} 
                                </Input>
                   </InputGroup>
                    <div hidden={!regionsLoad}>
                   <Label>Вибір курорту</Label>
                   <InputGroup  className="mb-3" >
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
                          {regions.map(item => <option  key={item.id} value={item.id} >{item.name}</option>)} 
                             </Input>
                   </InputGroup>
                   </div>
                  <div  hidden={!hotelsLoad} >
                   <Label>Вибір готеля</Label>
                   <InputGroup  className="mb-3">
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
                              {hotels.map(item => <option  key={item.id} value={item.id} >{item.name}</option>)} 
                                </Input>
                      </InputGroup>
                      </div>  
                      <div className='container' hidden={!hotelSelect}>
                        <Row>
                          <div className="form-group">
                            <label id="labelForInput" htmlFor="inputFile">
                              {
                                !this.state.isLoadingPhoto ?
                                  <img
                                    src={imageBase64}
                                    id="image"
                                    alt=""
                                    name="image"
                                    style={{ marginLeft: '80px' }}
                                    width="250" />
                                  : <p></p>
                              }
                              {!!errors.image ? <span className="help-block">{errors.image}</span> : ''}
                              <input type="file" id="inputFile" onChange={this.changeInput} ></input>
                            </label>
                          </div>

                          <div className={!this.state.isLoadingPhoto ? "div-hidden" : "div-visible form-group"} >
                            <Cropper
                              style={{ height: 400, width: 400, overflow: 'hidden' }}
                              aspectRatio={640 / 480}
                              preview=".img-preview"
                              guides={false}
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
                        </Row>
                      </div>
 
                      <Row  className="justify-content-center">
                        <Col xs="5">
                          <Button type="submit" color="primary" className="px-4" disabled={isLoading}>Додати фото</Button>
                        </Col>
                        <Col xs="2">
                        <Link to={`/admin/`}>
                        <Button   color="danger"   className="px-4" >Закрити</Button>
                          </Link>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
      </React.Fragment>
      );
      return form;
  }
}


  const PhotoHotelAdd = AddPhotoHotelForm;
  export default PhotoHotelAdd;