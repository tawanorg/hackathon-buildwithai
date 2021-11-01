import React, { Component } from 'react';
import { Flex, Text, Box } from '@chakra-ui/react'
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => (
    <Box style={{
        color: 'white', 
        background: 'green',
        width: '20px',
        height: '20px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        display: 'flex',
        justifyItems: 'center',
        justifyContent: 'center'
    }} />
  );
  
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: -37.808163434,
      lng: 144.957829502
    },
    zoom: 11
  };

  render() {
    return (
      <Box>
          <Flex flexDir="column" alignItems={"center"} justifyContent={"center"} p={4}>
            <Text>Nearest location</Text>
            <Text>301-311 Flinders Ln, Melbourne VIC 3000, Australia</Text>
          </Flex>
          <Box style={{ height: '200px', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyD33pssunz_P8z-LOTHeiYw1fPMuXXnszo' }}
              defaultCenter={this.props.center}
              defaultZoom={this.props.zoom}
            >
            <AnyReactComponent
              lat={this.props.center.lat}
              lng={this.props.center.lng}
              text="15 Southbank, VIC"
            />
            </GoogleMapReact>
        </Box>
      </Box>
    );
  }
}

export default SimpleMap;
