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

mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';


class HotelMarkerMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
          lng: -79.38,
          lat: 43.65,
          zoom: 7.5,
          image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMi0QnVvJROe-0oXg0a29J9mJLk2c9JMnuC3F893xeKMa2R_ou",
          name: 'Hotel Name'
        };
      }
    
      //const placeholder = document.createElement('div');
      // const marker = ReactDOM.render(
      //   <div className='mapboxgl-marker'>
      //     <marker/>
      //   </div>, placeholder);  
      //const markerRef = new mapboxgl.Marker(marker).setLngLat(position).addTo(map);
    
      //tooltipContainer;
      markerContainer;
      markerRef = null;
    
      // setTooltip(features) {
      //   if (features === null) {
      //     this.tooltipContainer.innerHTML = '';
      //     return;
      //   }
    
      //   if (features.length) {
      //     ReactDOM.render(
      //       React.createElement(
      //         Tooltip, {
      //         features
      //       }
      //       ),
      //       this.tooltipContainer
      //     );
      //   } else {
      //     this.tooltipContainer.innerHTML = '';
      //   }
      // }
    
    
      // setTooltip(features) {
      //   if (features === null) {
      //     this.markerContainer.innerHTML = '';
      //     return;
      //   }
    
      //   if (features.length) {
      //     ReactDOM.render(
      //       <div className='mapboxgl-marker'>
      //         {/* <marker /> */}
      //         {/* <h1>Hello</h1> */}
      //         <img alt="marker" src={mapMarkerIcon} height="45px" width="25px" />
      //       </div>, this.markerContainer);
      //   } else {
      //     this.markerContainer.innerHTML = '';
      //   }
      // }
    
    
      componentDidMount() {
        const { lng, lat, zoom, image, name } = this.state;
    
        // Container to put React generated content in.
        //this.tooltipContainer = document.createElement('div');
        this.markerContainer = document.createElement('div');
    
        const map = new mapboxgl.Map({
          container: this.mapContainer,
          style: 'mapbox://styles/mapbox/streets-v9',
          center: [lng, lat],
          zoom
        });

        map.resize();
    // lng: -79.38,
    //lat: 43.65,
        map.flyTo({
          center: [
            26.25,
            50.61]
        });
        map.resize();

        // let directs = new MapboxDirections({
        //     accessToken: mapboxgl.accessToken,
        //     unit: 'metric'
        // })  
        
        // map.addControl(directs, 'top-right');
    
        const marker = ReactDOM.render(
          <div className='mapboxgl-marker'>
            {/* <marker /> */}
            {/* <h1>Hello</h1> */}
            <img alt="marker" src={mapMarkerIcon} height="45px" width="25px" />
          </div>, this.markerContainer);
    
        // const marker =  new mapboxgl.Marker(this.markerContainer,{
        //   color: 'blue',
        //   draggable: true
        // })
        //   .setLngLat([
        //     lng, lat
        //   ])
        //   //.setPopup(popup)
        //   .addTo(map);
    
        // const tooltip = new mapboxgl.Marker(this.tooltipContainer, {
        //   offset: [-120, 0]
        // })
        //   .setLngLat([0, 0])
        //   .addTo(map);
    
        map.on('mousedown', function (e) {
          console.log("mousedown", e);
          //console.log("e.originalEvent.view.which", e.originalEvent);
          console.log("e.originalEvent.which", e.originalEvent.which);
          // if (e.originalEvent.which === 2) {
          //   this.markerContainer.innerHTML = '';
          //   return;
          // }
          let popup = null;
    
          if (e.originalEvent.which === 3) {
    
            const coordX = e.lngLat.lng;
            const coordY = e.lngLat.lat;
            console.log("coordY", coordX, coordY);
    
            if(this.markerRef != null){
              // map.remove(popup);
              this.markerRef.remove();
              this.markerRef = null;
            }
    
            popup = new mapboxgl.Popup()
              .setLngLat([coordX, coordY])
              .setHTML(
                '<div>'+ 
                '<h2 style="text-align: center">' + name +'</h2>'+
                '<img alt="marker" + src="'+image+'" height="150px" width="auto" />'
                +'</div>'
              )
              .addTo(map);
    
            this.markerRef = new mapboxgl.Marker(marker, {
              draggable: false,
            })
              .setLngLat([coordX, coordY])
              .setPopup(popup)
              .addTo(map);

              this.markerRef.togglePopup();
            console.log("markerRef", this.markerRef);
    
            //   this.marker = new MapboxGl.Marker({
            //     draggable: this.props.draggable,
            //     element: this.refs.wrapper
            //   })
            //     .setLngLat([this.props.coordinate.lon, this.props.coordinate.lat])
            //     .addTo(map);
    
          }

          
        });
    
        // if(this.markerRef!=null){
        //   this.markerRef.on('drag', () => {
        //     console.log("drag");
        //     // const lngLat = this.marker.getLngLat();
        //     // this.props.onDrag && this.props.onDrag(lngLat);
        //   });
        // }
    
    
    
        map.on('mousemove', (e) => {
          const features = map.queryRenderedFeatures(e.point);
          // tooltip.setLngLat(e.lngLat);
          // map.getCanvas().style.cursor = features.length ? 'pointer' : '';
          // this.setTooltip(features);
    
          const { lng, lat } = e.lngLat;
          //const { zoom } = map.getCenter();
    
          this.setState({
            lng: lng.toFixed(4),
            lat: lat.toFixed(4),
            zoom: map.getZoom().toFixed(2)
          });
    
          if (typeof features[0] !== typeof undefined) {
            //let cityName = features[0].properties.name_en;
            let placeType = features[0].properties.type;
    
    
            if (placeType === "city" || placeType === "town" || placeType === "village") {
              map.getCanvas().style.cursor = 'crosshair';
              placeType += " ";
              //tooltip.setLngLat(e.lngLat);
              // this.setTooltip(features);
              console.log("placeType", placeType);
              console.log("cityname", features[0].properties.name_en);
              console.log("e.lngLat", e.lngLat.lng, e.lngLat.lat);
              console.log("e", e);
            }
            else {
              map.getCanvas().style.cursor = 'grab';
              placeType = "";
              //this.setTooltip(null);
            }
    
          }
        });
      }
    
      render() {
        const { lng, lat, zoom } = this.state;
        return (
          <div style={{position:"absolute", top:"200px", left:"200px", width:"50%", height:"50%", borderRadius:"100px"}}>
            <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
              <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
            </div>
            <div ref={el => this.mapContainer = el} className="absolute top right left bottom" />
          </div>
        );
      }
    }
 
export default HotelMarkerMap;