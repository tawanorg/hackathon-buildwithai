import React from 'react';
import { Flex } from '@chakra-ui/react';
import mapboxgl from 'mapbox-gl';
 
const SOURCE = 'map';

const Map = ({ children }) => {
  const pageIsMounted = React.useRef();
  const [data, setData] = React.useState([])

  mapboxgl.accessToken =
    'pk.eyJ1IjoidGV3dGF3YW4iLCJhIjoiY2tzbGxtcndnMHhqcjJ2cGN4ZmNwdnd2aiJ9.R3U0u48b9OGaNHroO__7eg';

  React.useEffect(() => {
    pageIsMounted.current = true;

    return () => {
      pageIsMounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    getData()
  }, [])

  React.useEffect(() => {
    if (!pageIsMounted) return;
    if (data.length === 0) return;

    const centerLatLng = [-33.80899676, 151.0006667].reverse();

    const center = new mapboxgl.LngLat(centerLatLng[0], centerLatLng[1]);

    const newMap = new mapboxgl.Map({
      container: 'my-map',
      style: 'mapbox://styles/tewtawan/cksllpfm08r9817och29fwr9f',
      center,
      zoom: 10,
      pitch: 45,
      // maxBounds,
    });
    // if (newMap) {
    //   newMap.on('load', () => {
    //     addDataLayer(newMap, data);
    //   });
    // }
  }, [data]);

  const getData = async () => {
    const response = await fetch('/api/ethin')
    const result = await response.json()
    setData(result)
  }

  return (
    <Flex pos="relative">
      <Flex
        pos="absolute"
        left={0}
        top={0}
        bottom={0}
        zIndex="sticky"
        height="300px"
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          m={2}
          borderRadius="lg"
          borderWidth="1px"
          p={2}
          shadow="md"
          bg="white"
        >
          {children}
        </Flex>
      </Flex>
      <div id="my-map" style={{ height: '300px', width: '100%' }} />
    </Flex>
  );
};

function addDataLayer(map, data) {

  map.addSource(SOURCE, {
    type: 'geojson',
    data,
  });

  map.addLayer({
    id: `${SOURCE}-circles`,
    type: 'circle',
    source: SOURCE,
    paint: {
      'circle-color': [
        'interpolate',
        ['linear'],
        ['get', 'DAILY_AVG'],
        6,
        LINE_TWO_COLOR,
        30,
        BALANCE_LINE_COLOR,
      ],
      'circle-opacity': 0.75,
      'circle-radius': [
        'interpolate',
        ['linear'],
        ['get', 'DAILY_AVG'],
        6,
        20,
        8,
        30,
      ],
    },
  });

  map.addLayer({
    id: `${SOURCE}-labels`,
    type: 'symbol',
    source: SOURCE,
    layout: {
      'text-field': ['concat', ['to-string', ['get', 'DAILY_AVG']], ' kWh'],
      'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
    paint: {
      'text-color': '#fff',
    },
  });

  // When a click event occurs on a feature in
  // the unclustered-point layer, open a popup at
  // the location of the feature, with
  // description HTML from its properties.
  map.on('click', `${SOURCE}-circles`, e => {
    const coordinates = e.features[0].geometry.coordinates.slice();
    // const mag = e.features[0].properties.mag;
    // const tsunami = e.features[0].properties.tsunami === 1 ? 'yes' : 'no';

    // Ensure that if the map is zoomed out such that
    // multiple copies of the feature are visible, the
    // popup appears over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(`General supply: ${e.features[0].properties.GENERAL_SUPPLY}`)
      .addTo(map);
  });

  map.on('mouseenter', 'clusters', () => {
    map.getCanvas().style.cursor = 'pointer';
  });
  map.on('mouseleave', 'clusters', () => {
    map.getCanvas().style.cursor = '';
  });
}

export default Map;
