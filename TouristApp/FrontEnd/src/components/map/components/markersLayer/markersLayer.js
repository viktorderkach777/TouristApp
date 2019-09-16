




import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import compose from '../../../../utils/compose';
// import withMapService from '../hoc';
// import { markersLayerLoaded, markersLayerError, markersLayerRequested } from '../../actions';
// import CentrPageSpinner from '../../../CentrPageSpinner';
// const ErrorIndicator = React.lazy(() => import('../../../errorIndicator'));

import mapboxgl from 'mapbox-gl';
import './markersLayer.css';


mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

const hotels = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -77.034084142948,
                    38.909671288923
                ]
            },
            "properties": {
                "country": "Egypt",
                "region": "Hurgada",
                "name": "HotelName 1",
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMi0QnVvJROe-0oXg0a29J9mJLk2c9JMnuC3F893xeKMa2R_ou",
                "rate": "3"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -77.049766,
                    38.900772
                ]
            },
            "properties": {
                "country": "Egypt",
                "region": "Sharm El Sheikh",
                "name": "HotelName 2",
                "image": "https://www.vegas.com/media/x5oIDNm-pMQ3bqcCL.jpg.pagespeed.ic.i5kgYjv-o6.jpg",
                "rate": "4"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -77.043929,
                    38.910525
                ]
            },
            "properties": {
                "country": "Egypt",
                "region": "Coral Bay",
                "name": "HotelName 3",
                "image": "https://media-cdn.tripadvisor.com/media/photo-s/10/00/09/a8/swimming-pool.jpg",
                "rate": "5"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -77.0672,
                    38.90516896
                ]
            },
            "properties": {
                "country": "Turkey",
                "region": "Antalya",
                "name": "HotelName 4",
                "image": "https://media-cdn.tripadvisor.com/media/photo-s/08/b1/b4/fb/aria-hotel-budapest.jpg",
                "rate": "3"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -77.002583742142,
                    38.887041080933
                ]
            },
            "properties": {
                "country": "Turkey",
                "region": "Alanya",
                "name": "HotelName 5",
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMi0QnVvJROe-0oXg0a29J9mJLk2c9JMnuC3F893xeKMa2R_ou",
                "rate": "4"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -76.933492720127,
                    38.99225245786
                ]
            },
            "properties": {
                "country": "Turkey",
                "region": "Kemer",
                "name": "HotelName 6",
                "image": "https://thumbnails.trvl-media.com/AsIll6nJdWeO_tyD_70wa-_jGVw=/467x263/images.trvl-media.com/hotels/6000000/5970000/5963300/5963292/98e1e55b_b.jpg",
                "rate": "5"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -77.097083330154,
                    38.980979
                ]
            },
            "properties": {
                "country": "Greece",
                "region": "Crete",
                "name": "HotelName 7",
                "image": "https://www.sbhfue.com/en/dms/multiHotel-SBH-Hotels-Resorts/los-hotel/costa-calma-beach-sbh-hotels.jpg",
                "rate": "3"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -77.359425054188,
                    38.958058116661
                ]
            },
            "properties": {
                "country": "Greece",
                "region": "Zakintos",
                "name": "HotelName 8",
                "image": "https://pix10.agoda.net/hotelImages/237/237219/237219_16061614410043650820.jpg?s=312x235&ar=16x9",
                "rate": "4"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -77.10853099823,
                    38.880100922392
                ]
            },
            "properties": {
                "country": "Greece",
                "region": "Rhodes",
                "name": "HotelName 9",
                "image": "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,f_auto,h_162,q_auto,w_300/itemimages/67/36/67361_v5.jpeg",
                "rate": "5"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -75.28784,
                    40.008008
                ]
            },
            "properties": {
                "country": "Ukraine",
                "region": "Odesa",
                "name": "HotelName 10",
                "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMi0QnVvJROe-0oXg0a29J9mJLk2c9JMnuC3F893xeKMa2R_ou",
                "rate": "3"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -75.20121216774,
                    39.954030175164
                ]
            },
            "properties": {
                "country": "Ukraine",
                "region": "Zatoka",
                "name": "HotelName 11",
                "image": "https://s3.amazonaws.com/busites_www/mville2017/pages/meta/1/1/margville_stay_costa_rica_v03_1554137853.jpg",
                "rate": "4"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point",
                "coordinates": [
                    -77.043959498405,
                    38.903883387232
                ]
            },
            "properties": {
                "country": "Ukraine",
                "region": "Kyrylovka",
                "name": "HotelName 12",
                "image": "https://zone1-ibizaspotlightsl.netdna-ssl.com/sites/default/files/styles/generic_third_width/public/accommodation-images/132710/coupon-1543323436.jpg?itok=f0TOcese",
                "rate": "5"
            }
        }
    ]
};

class MarkersLayer extends Component {
    map;

    state = {
        active: null,
        popup: null
    };

    componentDidMount() {
        // this.props.getMarkersLayer();
        // const { hotels} = this.props;     

        this.map = new mapboxgl.Map({
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/streets-v10',
            //center: [-77.034084, 38.909671],
            center: hotels.features[0].geometry.coordinates,
            zoom: 10
        });

        this.map.on('load', () => {
            this.map.addSource('places', {
                type: 'geojson',
                data: hotels
            });

            this.createAllMarkers();
        });
    }

    createMarker(index) {
        var el = document.createElement('div');

        // Add a class called 'marker' to each div
        el.className = 'marker';

        el.onclick = () => this.linkOrMarkerClick(hotels.features[index], index);

        // By default the image for your custom marker will be anchored
        // by its center. Adjust the position accordingly
        // Create the custom markers, set their position, and add to map
        new mapboxgl.Marker(el, { offset: [17, 0] })
            .setLngLat(hotels.features[index].geometry.coordinates)
            .addTo(this.map);
    }

    createAllMarkers = () => {
        const res = (hotels.features.map((element, index) => {
            this.createMarker(index);
            return res;
        }))
    }

    flyToMarker(center, zoom) {
        this.map.flyTo({
            center,
            zoom
        });
    }

    setStars(stars) {
        let nstars = parseInt(stars, 10);

        let text = '';
        for (let i = 0; i < 5; i++) {
            if (i <= nstars - 1) {
                text = text + '<span class="fa fa-star checked"></span>';
            }
            else {
                text = text + '<span class="fa fa-star"></span>';
            }
        }
        return text;

        // switch (nstars) {
        //   case 0:
        //     return (
        //       <div>
        //         <span className="fa fa-star"></span>
        //         <span className="fa fa-star"></span>
        //         <span className="fa fa-star"></span>
        //         <span className="fa fa-star"></span>
        //         <span className="fa fa-star"></span>
        //       </div>
        //     )
        //   case 1:
        //       return (
        //         <div>
        //           <span className="fa fa-star checked"></span>
        //           <span className="fa fa-star"></span>
        //           <span className="fa fa-star"></span>
        //           <span className="fa fa-star"></span>
        //           <span className="fa fa-star"></span>
        //         </div>
        //       )
        //   case 2:
        //       return (
        //         <div>
        //           <span className="fa fa-star checked"></span>
        //           <span className="fa fa-star checked"></span>
        //           <span className="fa fa-star"></span>
        //           <span className="fa fa-star"></span>
        //           <span className="fa fa-star"></span>
        //         </div>
        //       )
        //   case 3:
        //       return (
        //       <div>
        //       <span className="fa fa-star checked"></span>
        //       <span className="fa fa-star checked"></span>
        //       <span className="fa fa-star checked"></span>
        //       <span className="fa fa-star"></span>
        //       <span className="fa fa-star"></span>
        //     </div>
        //       )
        //   case 4:
        //       return (
        //       <div>
        //       <span className="fa fa-star checked"></span>
        //       <span className="fa fa-star checked"></span>
        //       <span className="fa fa-star checked"></span>
        //       <span className="fa fa-star checked"></span>
        //       <span className="fa fa-star"></span>
        //     </div>
        //       )
        //   case 5:
        //       return (
        //       <div>
        //       <span className="fa fa-star checked"></span>
        //       <span className="fa fa-star checked"></span>
        //       <span className="fa fa-star checked"></span>
        //       <span className="fa fa-star checked"></span>
        //       <span className="fa fa-star checked"></span>
        //     </div>
        //       )
        //   default:
        //       return (
        //         <div>
        //           <span className="fa fa-star"></span>
        //           <span className="fa fa-star"></span>
        //           <span className="fa fa-star"></span>
        //           <span className="fa fa-star"></span>
        //           <span className="fa fa-star"></span>
        //         </div>
        //       )
        // }

    }

    linkOrMarkerClick = (element, index) => {

        // 1. Fly to the point associated with the clicked link
        this.flyToMarker(element.geometry.coordinates, 12);

        // 2. Close all other popups and display popup for clicked store
        // Check if there is already a popup on the map and if so, remove it
        if (this.state.popup) this.state.popup.remove();

        const descript =
            '<h3 >' + element.properties.name + '</h2>' +
            '<img alt="marker" + src="' + element.properties.image + '" />' +
            '<div class="stars" style="padding-bottom: 0px;">' + this.setStars(element.properties.rate) + '</div>' +
            '<h4 style="padding-top: 0px;">' + element.properties.country + ', ' + element.properties.region + '</h4>';

        //'<h3>Sweetgreen</h3>' +'<h4>' + element.properties.address + '</h4>'
        const popup = new mapboxgl.Popup({ closeOnClick: false, offset: [17, 0] })
            .setLngLat(element.geometry.coordinates)
            .setHTML(descript)
            .addTo(this.map);

        // 3. Highlight listing in sidebar (and remove highlight for all other listings)
        this.setState({
            popup,
            active: "listing-" + index
        });
    };

    render() {

        // const { hotels, markersLayerLoaded, markersLayerError } = this.props;

        // if (markersLayerLoaded) {
        //     return <CentrPageSpinner loading={markersLayerLoaded} />
        // }

        // if (markersLayerError) {
        //     return <ErrorIndicator />
        // }

        const locations = hotels.features.map((element, index) => {

            // Shorten data.feature.properties to `prop` so we're not
            // writing this long form over and over again.
            const prop = element.properties;

            let det = prop.country + ', ' + prop.region;


            return (
                <div key={index} className={this.state.active === 'listing-' + index ? 'item active' : 'item'} id={'listing-' + index}>
                    <a tabIndex="0" className="title" onClick={() => this.linkOrMarkerClick(element, index)}>{prop.name}</a>

                    <div>{det}</div>
                </div>
            )
        })


        return (
            <div id="body">
                <div ref={el => this.mapContainer = el} id='map' className='map pad2' />
                <div className='mysidebar'>
                    <div className='heading'>
                        <h1>Our locations</h1>
                    </div>
                    <div id='listings' className='listings'>
                        {locations}
                    </div>
                </div>
            </div>
        );
    }
}

// const mapDispatchToProps = (dispatch, ownProps) => {
//     const { mapService } = ownProps;    

//     return {
//         getMarkersLayer: () => {
//             dispatch(markersLayerRequested());
//             mapService.getMarkersLayer()
//                 .then((hotels) => {
//                     dispatch(markersLayerLoaded(hotels))
//                 })
//                 .catch((err) => dispatch(markersLayerError(err)))
//         }       
//     }
// };

// const mapStateToProps = (state) => {
//     const { hotels, markersLayerLoading, markersLayerError } = state.map;
//     //console.log("state.weather", state.weather)
//     return {
//         hotels,
//         markersLayerLoading,
//         markersLayerError
//     };
// };

// export default compose(
//     withMapService(),
//     connect(mapStateToProps, mapDispatchToProps)
// )(MarkersLayer);

export default MarkersLayer;


