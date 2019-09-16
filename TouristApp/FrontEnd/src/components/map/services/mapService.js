

export default class MapService {

    hotels = {
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

    getMarkersLayer= async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
              resolve(this.hotels)
            }, 700);
          });
        // console.log('weather', weather)
        // return weather;
    }
}