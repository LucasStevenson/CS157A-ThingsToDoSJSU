import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const queryListing = [
    {
      place_id: 1,
      name: 'SoFA Market',
      business_type: 'food',
      recommendation_rating: 4.4,
      cash_rating: 2,
      phone_number: '(408) 642-5270',
      distance: '0.7 mi'
    },
    {
      place_id: 2,
      name: "Sammy G's Pizzeria",
      business_type: 'meal_delivery',
      recommendation_rating: 4.4,
      cash_rating: 2,
      phone_number: '(408) 638-7076',
      distance: '0.6 mi'
    },
    {
      place_id: 3,
      name: 'Pizza My Heart',
      business_type: 'meal_takeaway',
      recommendation_rating: 4.3,
      cash_rating: 1,
      phone_number: '(408) 280-0707',
      distance: '0.5 mi'
    },
    {
      place_id: 4,
      name: 'Cali Spartan Mexican Kitchen',
      business_type: 'restaurant',
      recommendation_rating: 4.3,
      cash_rating: 1,
      phone_number: '(408) 899-2755',
      distance: '0.7 mi'
    },
    {
      place_id: 5,
      name: 'Philz Coffee',
      business_type: 'cafe',
      recommendation_rating: 4.6,
      cash_rating: 2,
      phone_number: '(408) 971-4212',
      distance: '0.3 mi'
    },
    {
      place_id: 6,
      name: 'Yogurtland San Jose',
      business_type: 'store',
      recommendation_rating: 4.4,
      cash_rating: 1,
      phone_number: '(408) 753-3170',
      distance: '0.4 mi'
    },
    {
      place_id: 7,
      name: 'San Carlos Italian Pizza',
      business_type: 'restaurant',
      recommendation_rating: 4.2,
      cash_rating: 1,
      phone_number: '(408) 977-0605',
      distance: '0.6 mi'
    },
    {
      place_id: 8,
      name: 'Vietnoms',
      business_type: 'meal_delivery',
      recommendation_rating: 4.4,
      cash_rating: 1,
      phone_number: '(408) 827-5812',
      distance: '0.6 mi'
    },
    {
      place_id: 9,
      name: "Lee's Sandwiches",
      business_type: 'restaurant',
      recommendation_rating: 4.3,
      cash_rating: 1,
      phone_number: '(408) 286-8808',
      distance: '1.3 mi'
    }
  ]

let placeListings = {};
for (let listing of queryListing) {
    placeListings[listing.place_id] = listing;
}

const queryAddress = [
    {
      address_id: 1,
      place_id: 1,
      street_address: '387 S 1st St, San Jose, CA 95113, USA',
      latitude: '37.3302294',
      longitude: '-121.8865453'
    },
    {
      address_id: 2,
      place_id: 2,
      street_address: '330 S 10th St #100, San Jose, CA 95112, USA',
      latitude: '37.3357426',
      longitude: '-121.8770959'
    },
    {
      address_id: 3,
      place_id: 3,
      street_address: '117 E San Carlos St, San Jose, CA 95112, USA',
      latitude: '37.332831',
      longitude: '-121.8847264'
    },
    {
      address_id: 4,
      place_id: 4,
      street_address: '515 S 10th St, San Jose, CA 95112, USA',
      latitude: '37.3326758',
      longitude: '-121.8753175'
    },
    {
      address_id: 5,
      place_id: 5,
      street_address: '118 Paseo de San Antonio, San Jose, CA 95112, USA',
      latitude: '37.333572',
      longitude: '-121.8850492'
    },
    {
      address_id: 6,
      place_id: 6,
      street_address: '125 E San Carlos St, San Jose, CA 95112, USA',
      latitude: '37.3330355',
      longitude: '-121.8842598'
    },
    {
      address_id: 7,
      place_id: 7,
      street_address: '484 E San Carlos St, San Jose, CA 95112, USA',
      latitude: '37.3361433',
      longitude: '-121.876885'
    },
    {
      address_id: 8,
      place_id: 8,
      street_address: '387 S 1st St Ste 121, San Jose, CA 95113, USA',
      latitude: '37.3302142',
      longitude: '-121.8865419'
    },
    {
      address_id: 9,
      place_id: 9,
      street_address: '260 E Santa Clara St, San Jose, CA 95113, USA',
      latitude: '37.3384832',
      longitude: '-121.8848689'
    },
    {
      address_id: 10,
      place_id: 10,
      street_address: 'One S Market St Ste 40, San Jose, CA 95113, USA',
      latitude: '37.3309555',
      longitude: '-121.888268'
    }
  ];

let placeAddress = {}  
for (let address of queryAddress) {
    placeAddress[address.place_id] = address;
}


function findByPlaceID(table, place_id){
    for (const [key, value] of Object.entries(table)){
        if (value["place_id"] == place_id) return table[key];
    }
    return null;

}
let markers = [];
function generateMarkers(){
    for (let key of Object.keys(placeListings)){
        let coords = findByPlaceID(placeAddress, key);
        let marker = <Marker position={[coords.latitude, coords.longitude]}/>
        markers.push(marker);
    }
}

function Map(props) {
    generateMarkers();

    return (
        <MapContainer id="map" center={[37.33519, -121.881225]} zoom={16} maxZoom={17} >
            <TileLayer //dark mode: replace osm_bright with alidade_smooth_dark
                attribution= '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png?api_key=13c843ee-044e-4f29-9ed4-bc4eaa976725'/> 
            {markers};
        </MapContainer>
    )
}

export default Map;