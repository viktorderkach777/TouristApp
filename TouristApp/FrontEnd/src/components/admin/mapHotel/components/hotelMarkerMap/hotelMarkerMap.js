import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import mapboxgl from 'mapbox-gl';
//import {MapboxDirections} from '@mapbox/mapbox-gl-directions';
//import Tooltip from './components/tooltip';
import mapMarkerIcon from './marker-icon.svg';
//var mapboxgl = require('mapbox-gl');
//var MapboxDirections = require('@mapbox/mapbox-gl-directions');
//import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'

import 'mapbox-gl/dist/mapbox-gl.css' // Updating node module will keep css up to date.
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import './hotelMarkerMap.css';

import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row} from 'reactstrap';

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';


class HotelMarkerMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -79.38,
      lat: 43.65,
      zoom: 7.5,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMi0QnVvJROe-0oXg0a29J9mJLk2c9JMnuC3F893xeKMa2R_ou",
      name: 'Hotel Name',
      email: '',
      password: '',
      errors: {
      },
      done: false,
      isLoading: false,
      cityType: "",
      cityName: ""
    };
  }


  markerContainer;
  markerRef = null;



  componentDidMount() {
    const { lng, lat, zoom, image, name } = this.state;

    this.markerContainer = document.createElement('div');

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });

    //map.resize();

    map.flyTo({
      center: [
        26.25,
        50.61]
    });
    //map.resize();

    const marker = ReactDOM.render(
      <div className='mapboxgl-marker'>
        <img alt="marker" src={mapMarkerIcon} height="45px" width="25px" />
      </div>, this.markerContainer);


    map.on('mousedown', function (e) {
      console.log("mousedown", e);

      console.log("e.originalEvent.which", e.originalEvent.which);

      let popup = null;

      if (e.originalEvent.which === 3) {

        const coordX = e.lngLat.lng;
        const coordY = e.lngLat.lat;
        console.log("coordY", coordX, coordY);

        if (this.markerRef != null) {

          this.markerRef.remove();
          this.markerRef = null;
        }

        // popup = new mapboxgl.Popup()
        //   .setLngLat([coordX, coordY])
        //   .setHTML(
        //     '<div>' +
        //     '<h2 style="text-align: center">' + name + '</h2>' +
        //     '<img alt="marker" + src="' + image + '" height="150px" width="auto" />'
        //     + '</div>'
        //   )
        //   .addTo(map);

        const descript =
          '<div>' +
          '<h2 style="text-align: center">' + name + '</h2>' +
          '<img alt="marker" + src="' + image + '" height="150px" width="auto" />'
          + '</div>';

          popup = new mapboxgl.Popup({  offset: [0, -5] })
          .setLngLat([coordX, coordY])
          .setHTML(
            descript
          )
          .addTo(map);

        // popup = new mapboxgl.Popup({  offset: [17, 0] })
        //   .setLngLat([coordX, coordY])
        //   .setHTML(descript)
        //   .addTo(this.map);


        this.markerRef = new mapboxgl.Marker(marker, {
          draggable: false,
        })
          .setLngLat([coordX, coordY])
           .setPopup(popup)
          .addTo(map);

        //this.markerRef.togglePopup();
        console.log("markerRef", this.markerRef);
      }
    });





    map.on('mousemove', (e) => {
      const features = map.queryRenderedFeatures(e.point);

      const { lng, lat } = e.lngLat;

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
        cityType: "",
        cityName: ""
      });

      if (typeof features[0] !== typeof undefined) {
        //let cityName = features[0].properties.name_en;
        let placeType = features[0].properties.type;


        if (placeType === "city" || placeType === "town" || placeType === "village") {
          map.getCanvas().style.cursor = 'crosshair';
          placeType += " ";
          console.log("placeType", placeType);
          console.log("features[0]", features[0]);
          console.log("cityname", features[0].properties.name_en);
          console.log("e.lngLat", e.lngLat.lng, e.lngLat.lat);
          console.log("e", e);
          this.setState({
            cityType: placeType,
            cityName: features[0].properties.name_en
          });
        }
        else {
          map.getCanvas().style.cursor = 'grab';
          placeType = "";

        }

      }
    });
  }


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

  
  handleChange = (e) => {
    this.setStateByErrors(e.target.name, e.target.value);
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    //let errors = {};
    console.log('submit');
    //if (!validateemail(this.state.email)) errors.email = "Enter valid email"
    // if (this.state.email === '') errors.email = "Can't be empty!"
    // if (this.state.password === '') errors.password = "Can't be empty!"

    //const isValid = Object.keys(errors).length === 0
    // if (isValid)
    // {
      // const { email, password } = this.state;
      // console.log('validform',email, password);
      // this.setState({ isLoading: true });
      //console.log('----login---', this.props);
      // this.props.login({ Email: email, Password: password })
      //   .then(
      //     () =>{this.setState({ done: true },this.getUrlToRedirect());},
      //     (err) => this.setState({ errors: err.response.data, isLoading: false })
      //   );
    // }
    // else 
    // {
    //   this.setState({ errors });
    // }
  };


  render() {
    const { lng, lat, zoom, cityType, cityName } = this.state;


    const form = (
      <React.Fragment>
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit={this.onSubmitForm}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                  {/* {!!errors.invalid ? <Alert color="danger">{errors.invalid}</Alert> : ''} */}

                  <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          type="text"
                          placeholder="CityName"
                          autoComplete="current-cityName"
                          // className={classnames('form-control', { 'is-invalid': !!errors.password})}
                          className='form-control'
                          id="cityName"
                          name="cityName"
                          value={cityName}
                          onChange={this.handleChange}
                          />
                          {/* {!!errors.password ? <span className="help-block">{errors.password}</span> : ''} */}
                      </InputGroup>


                  <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          type="text"
                          placeholder="CityType"
                          autoComplete="current-cityType"
                          // className={classnames('form-control', { 'is-invalid': !!errors.password})}
                          className='form-control'
                          id="cityType"
                          name="cityType"
                          value={cityType}
                          onChange={this.handleChange}
                          />
                          {/* {!!errors.password ? <span className="help-block">{errors.password}</span> : ''} */}
                      </InputGroup>



                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          // className={classnames('form-control', { 'is-invalid': !!errors.email})}
                          className='form-control'
                          id="email"
                          name="email"
                          value={lng}
                          onChange={this.handleChange}
                          />
                          {/* {!!errors.email ? <span className="help-block">{errors.email}</span> : ''} */}
                      </InputGroup>

                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                          <i className="fa fa-hand-pointer-o" aria-hidden="true"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input 
                          type="text"
                          placeholder="Password"
                          autoComplete="current-password"
                          // className={classnames('form-control', { 'is-invalid': !!errors.password})}
                          className='form-control'
                          id="password"
                          name="password"
                          value={lat}
                          onChange={this.handleChange}
                          />
                          {/* {!!errors.password ? <span className="help-block">{errors.password}</span> : ''} */}
                      </InputGroup>

                      <Row>
                        <Col xs="6">
                          {/* <Button color="primary" className="px-4" disabled={isLoading}>Login</Button> */}
                          <Button color="primary" className="px-4" >Login</Button>
                        </Col>
                        {/* <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col> */}
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                {/* <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card> */}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
      </React.Fragment>
      );

    return (
      //     <div style={{ position: "absolute", top: "200px", left: "200px", width: "50%", height: "50%", borderRadius: "100px" }}>
      //       <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
      //         <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
      //       </div>
      //       <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
      //     </div>

      <div id="body">
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div ref={el => this.mapContainer = el} id='map' className='map pad2' />
        {/* <CentrPageSpinner loading={markersLayerLoading} /> */}

        <div className='mysidebar'>
          <div className='heading'>
            <h1>Our locations</h1>
          </div>
          <div id='listings' className='listings'>
            {/* {locations} */}
            {form}
            <h1>Hello</h1>
          </div>
        </div>
      </div>
    );
  }



}

export default HotelMarkerMap;








// import React, { Component } from 'react';
// import ReactDOM from 'react-dom'
// import mapboxgl from 'mapbox-gl';
// //import {MapboxDirections} from '@mapbox/mapbox-gl-directions';
// //import Tooltip from './components/tooltip';
// import mapMarkerIcon from './marker-icon.svg';
// //var mapboxgl = require('mapbox-gl');
// //var MapboxDirections = require('@mapbox/mapbox-gl-directions');
// //import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'

// import 'mapbox-gl/dist/mapbox-gl.css' // Updating node module will keep css up to date.
// import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css' 
// import './hotelMarkerMap.css';

// mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';


// class HotelMarkerMap extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           lng: -79.38,
//           lat: 43.65,
//           zoom: 7.5,
//           image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMi0QnVvJROe-0oXg0a29J9mJLk2c9JMnuC3F893xeKMa2R_ou",
//           name: 'Hotel Name'
//         };
//       }

//       //const placeholder = document.createElement('div');
//       // const marker = ReactDOM.render(
//       //   <div className='mapboxgl-marker'>
//       //     <marker/>
//       //   </div>, placeholder);  
//       //const markerRef = new mapboxgl.Marker(marker).setLngLat(position).addTo(map);

//       //tooltipContainer;
//       markerContainer;
//       markerRef = null;

//       // setTooltip(features) {
//       //   if (features === null) {
//       //     this.tooltipContainer.innerHTML = '';
//       //     return;
//       //   }

//       //   if (features.length) {
//       //     ReactDOM.render(
//       //       React.createElement(
//       //         Tooltip, {
//       //         features
//       //       }
//       //       ),
//       //       this.tooltipContainer
//       //     );
//       //   } else {
//       //     this.tooltipContainer.innerHTML = '';
//       //   }
//       // }


//       // setTooltip(features) {
//       //   if (features === null) {
//       //     this.markerContainer.innerHTML = '';
//       //     return;
//       //   }

//       //   if (features.length) {
//       //     ReactDOM.render(
//       //       <div className='mapboxgl-marker'>
//       //         {/* <marker /> */}
//       //         {/* <h1>Hello</h1> */}
//       //         <img alt="marker" src={mapMarkerIcon} height="45px" width="25px" />
//       //       </div>, this.markerContainer);
//       //   } else {
//       //     this.markerContainer.innerHTML = '';
//       //   }
//       // }


//       componentDidMount() {
//         const { lng, lat, zoom, image, name } = this.state;

//         // Container to put React generated content in.
//         //this.tooltipContainer = document.createElement('div');
//         this.markerContainer = document.createElement('div');

//         const map = new mapboxgl.Map({
//           container: this.mapContainer,
//           style: 'mapbox://styles/mapbox/streets-v9',
//           center: [lng, lat],
//           zoom
//         });

//         map.resize();
//     // lng: -79.38,
//     //lat: 43.65,
//         map.flyTo({
//           center: [
//             26.25,
//             50.61]
//         });
//         map.resize();

//         // let directs = new MapboxDirections({
//         //     accessToken: mapboxgl.accessToken,
//         //     unit: 'metric'
//         // })  

//         // map.addControl(directs, 'top-right');

//         const marker = ReactDOM.render(
//           <div className='mapboxgl-marker'>
//             {/* <marker /> */}
//             {/* <h1>Hello</h1> */}
//             <img alt="marker" src={mapMarkerIcon} height="45px" width="25px" />
//           </div>, this.markerContainer);

//         // const marker =  new mapboxgl.Marker(this.markerContainer,{
//         //   color: 'blue',
//         //   draggable: true
//         // })
//         //   .setLngLat([
//         //     lng, lat
//         //   ])
//         //   //.setPopup(popup)
//         //   .addTo(map);

//         // const tooltip = new mapboxgl.Marker(this.tooltipContainer, {
//         //   offset: [-120, 0]
//         // })
//         //   .setLngLat([0, 0])
//         //   .addTo(map);

//         map.on('mousedown', function (e) {
//           console.log("mousedown", e);
//           //console.log("e.originalEvent.view.which", e.originalEvent);
//           console.log("e.originalEvent.which", e.originalEvent.which);
//           // if (e.originalEvent.which === 2) {
//           //   this.markerContainer.innerHTML = '';
//           //   return;
//           // }
//           let popup = null;

//           if (e.originalEvent.which === 3) {

//             const coordX = e.lngLat.lng;
//             const coordY = e.lngLat.lat;
//             console.log("coordY", coordX, coordY);

//             if(this.markerRef != null){
//               // map.remove(popup);
//               this.markerRef.remove();
//               this.markerRef = null;
//             }

//             popup = new mapboxgl.Popup()
//               .setLngLat([coordX, coordY])
//               .setHTML(
//                 '<div>'+ 
//                 '<h2 style="text-align: center">' + name +'</h2>'+
//                 '<img alt="marker" + src="'+image+'" height="150px" width="auto" />'
//                 +'</div>'
//               )
//               .addTo(map);

//             this.markerRef = new mapboxgl.Marker(marker, {
//               draggable: false,
//             })
//               .setLngLat([coordX, coordY])
//               .setPopup(popup)
//               .addTo(map);

//               this.markerRef.togglePopup();
//             console.log("markerRef", this.markerRef);

//             //   this.marker = new MapboxGl.Marker({
//             //     draggable: this.props.draggable,
//             //     element: this.refs.wrapper
//             //   })
//             //     .setLngLat([this.props.coordinate.lon, this.props.coordinate.lat])
//             //     .addTo(map);

//           }


//         });

//         // if(this.markerRef!=null){
//         //   this.markerRef.on('drag', () => {
//         //     console.log("drag");
//         //     // const lngLat = this.marker.getLngLat();
//         //     // this.props.onDrag && this.props.onDrag(lngLat);
//         //   });
//         // }



//         map.on('mousemove', (e) => {
//           const features = map.queryRenderedFeatures(e.point);
//           // tooltip.setLngLat(e.lngLat);
//           // map.getCanvas().style.cursor = features.length ? 'pointer' : '';
//           // this.setTooltip(features);

//           const { lng, lat } = e.lngLat;
//           //const { zoom } = map.getCenter();

//           this.setState({
//             lng: lng.toFixed(4),
//             lat: lat.toFixed(4),
//             zoom: map.getZoom().toFixed(2)
//           });

//           if (typeof features[0] !== typeof undefined) {
//             //let cityName = features[0].properties.name_en;
//             let placeType = features[0].properties.type;


//             if (placeType === "city" || placeType === "town" || placeType === "village") {
//               map.getCanvas().style.cursor = 'crosshair';
//               placeType += " ";
//               //tooltip.setLngLat(e.lngLat);
//               // this.setTooltip(features);
//               console.log("placeType", placeType);
//               console.log("cityname", features[0].properties.name_en);
//               console.log("e.lngLat", e.lngLat.lng, e.lngLat.lat);
//               console.log("e", e);
//             }
//             else {
//               map.getCanvas().style.cursor = 'grab';
//               placeType = "";
//               //this.setTooltip(null);
//             }

//           }
//         });
//       }

//       render() {
//         const { lng, lat, zoom } = this.state;
//         return (
//           <div style={{position:"absolute", top:"200px", left:"200px", width:"50%", height:"50%", borderRadius:"100px"}}>
//             <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
//               <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
//             </div>
//             <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
//           </div>
//         );
//       }
//     }

// export default HotelMarkerMap;