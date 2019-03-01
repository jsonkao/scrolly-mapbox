import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';

const MyMap = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  interactive: false,
});

export default ({ center, zoom }) => (  
  <MyMap
    style="mapbox://styles/mapbox/satellite-v9"
    containerStyle={{
      height: '100vh',
      width: '100vw',
    }}
    center={center}
    zoom={[zoom]}
    flyToOptions={{ speed: 0.75 }}
  />
);
